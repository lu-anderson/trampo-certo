import type { Client } from '@/types/template';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from './firebase';

const COLLECTIONS = {
  CLIENTS: 'clients',
} as const;

export async function getClients(userId: string): Promise<Client[]> {
  try {
    const q = query(
      collection(firestore, COLLECTIONS.CLIENTS),
      where('userId', '==', userId)
    );

    const querySnapshot = await getDocs(q);
    const clients: Client[] = [];

    querySnapshot.forEach((doc) => {
      clients.push({ id: doc.id, ...doc.data() } as Client);
    });

    return clients;
  } catch (error) {
    console.error('Error fetching clients:', error);
    throw new Error('Erro ao buscar clientes');
  }
}

export async function createClient(userId: string, clientData: Omit<Client, 'id'>): Promise<Client> {
  try {
    const docRef = await addDoc(collection(firestore, COLLECTIONS.CLIENTS), {
      ...clientData,
      userId,
      createdAt: new Date().toISOString(),
    });

    return {
      id: docRef.id,
      ...clientData,
    };
  } catch (error) {
    console.error('Error creating client:', error);
    throw new Error('Erro ao criar cliente');
  }
}
