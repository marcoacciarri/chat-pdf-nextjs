'use server'

import { generateEmbeddingsInPineconeVectorStore } from "@/lib/langchain";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function generateEmbeddings(documentId: string) {
    auth().protect(); //prevent users who are not logged in from accessing this function

    // turn PDF into embeddings
    await generateEmbeddingsInPineconeVectorStore(documentId);

    revalidatePath('/dashboard/');

    return { success: true };
}