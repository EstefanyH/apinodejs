import dotenv from 'dotenv';
import fusion_controller from './src/interfaces/controllers/fusion_controller.js';
import storage_controller from './src/interfaces/controllers/storage_controller.js';
import history_controller from './src/interfaces/controllers/history_controller.js';

dotenv.config();

console.log("AWS_ACCESS_KEY_ID:", process.env.AWS_ACCESS_KEY_ID);
console.log("AWS_SECRET_ACCESS_KEY:", process.env.AWS_SECRET_ACCESS_KEY);
console.log("AWS_REGION:", process.env.AWS_REGION);

module.exports.fusionados = async (e) => FusionController.fusionados(e);
module.exports.almacenar = async (e) => StorageController.almacenar(e);
module.exports.historial = async (e) => HistoryController.historial(e);