import { generateKeyPair, exportPKCS8, exportSPKI, exportJWK, importPKCS8, importSPKI } from 'jose';
import fs from 'fs/promises';
import path from 'path';

const KEYS_DIR = path.resolve(__dirname, '../keys');
const PRIVATE_KEY_PATH = path.join(KEYS_DIR, 'private.pem');
const PUBLIC_KEY_PATH = path.join(KEYS_DIR, 'public.pem');
const JWKS_PATH = path.join(KEYS_DIR, 'jwks.json');

export async function generateAndSaveKeyPair() {
		await fs.mkdir(KEYS_DIR, { recursive: true });
		const { publicKey, privateKey } = await generateKeyPair('RS256');

		const pkcs8 = await exportPKCS8(privateKey);
		const spki = await exportSPKI(publicKey);
		await fs.writeFile(PRIVATE_KEY_PATH, pkcs8, 'utf8');
		await fs.writeFile(PUBLIC_KEY_PATH, spki, 'utf8');
		const publicJwk = await exportJWK(publicKey);
		publicJwk.alg = 'RS256';
		publicJwk.use = 'sig';
		publicJwk.kid = 'main-key'; 

		await fs.writeFile(JWKS_PATH, JSON.stringify({ keys: [publicJwk] }, null, 2), 'utf8');
		
		console.log('🔐 Claves generadas y guardadas en /keys');
  }
  

export const getPrivateKey = async () => {
	const pkcs8 = await fs.readFile(PRIVATE_KEY_PATH, 'utf8');
	return await importPKCS8(pkcs8, 'RS256');
}
	

export const getPublicKey = async () => {
  const spki = await fs.readFile(PUBLIC_KEY_PATH, 'utf8');
  return await importSPKI(spki, 'RS256');
}