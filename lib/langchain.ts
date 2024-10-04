import { ChatOpenAI } from '@langchain/openai';
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { OpenAIEmbeddings } from '@langchain/openai';
import { createStuffDocumentsChain } from 'langchain/chains/combine_documents';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { createRetrievalChain } from 'langchain/chains/retrieval';
import { createHistoryAwareRetriever } from 'langchain/chains/history_aware_retriever';
import { HumanMessage, AIMessage } from '@langchain/core/messages';
import pineconeClient from 'lib/pinecone';
import { PineconeStore } from '@langchain/pinecone';
import { PineconeConflictError } from '@pinecone-database/pinecone/dist/errors';
import { Index, RecordMetadata } from '@pinecone-database/pinecone';
import { adminDB } from 'lib/firebaseAdmin';
import { auth } from "@clerk/nextjs/server";

// Initialiaze OpenAI model 
const model = new ChatOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    model: 'gpt-3.5-turbo',
    //temperature: 0.5,
    //maxTokens: 100,
    //topP: 1,
    //frequencyPenalty: 0,
    //presencePenalty: 0,
    //stop: ['\n', 'Human:', 'AI:']
});

export const indexName = "chatpdf-nextjs";

export const generateDocs = async (documentId: string) => {
    const { userId } = await auth();
    if (!userId) {
        throw new Error('User not found');
    }

    console.log('Fetchind download url from firebase:', documentId);
    const docRef = await adminDB.collection('users').doc(userId).collection('files').doc(documentId).get();
    const downloadURL = docRef.data()?.downloadURL;

    if (!downloadURL) {
        throw new Error('Download URL not found');
    }

    console.log('Download URL fetched successfully:', downloadURL);
    const response = await fetch(downloadURL);
    const data = await response.blob();

    console.log('Loading PDF:', documentId);
    const pdfLoader = new PDFLoader(data);
    const docs = await pdfLoader.load();

    console.log('Splitting document into smaller parts:', documentId);
    const splitter = new RecursiveCharacterTextSplitter();
    const splitDocs = await splitter.splitDocuments(docs);
    return splitDocs;
}

export const namespaceExists = async (index: Index<RecordMetadata>, namespace: string) => {
    if (!namespace) {
        throw new Error('Namespace not provided');
    }

    const { namespaces } = await index.describeIndexStats();
    return namespaces?.[namespace] !== undefined;
}

export const generateEmbeddingsInPineconeVectorStore = async (documentId: string) => {
    const { userId } = await auth();

    if (!userId) {
        throw new Error('User not found');
    }

    let pineconeVectorStore;

    console.log('Generating embeddings for documentId:', documentId);
    const embeddings = new OpenAIEmbeddings();

    const index = await pineconeClient.index(indexName);
    const namespace = await namespaceExists(index, documentId);

    if (namespace) {
        console.log('Namespace already exists, reusing it:', documentId);

        pineconeVectorStore = await PineconeStore.fromExistingIndex(embeddings, {
            pineconeIndex: index,
            namespace: documentId,
        });

        return pineconeVectorStore;
    }

    const splitDocs = await generateDocs(documentId);
    console.log(`Storing the embeddings in namespace ${documentId} in the ${indexName} Pinecone vector store:`);

    pineconeVectorStore = await PineconeStore.fromDocuments(splitDocs,
        embeddings, {
        pineconeIndex: index,
        namespace: documentId,
    }
    );

    return pineconeVectorStore;
}
