const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const UPLOAD_FOLDER_BASE_URL = `${API_BASE_URL}/uploads/`;

const stables = { UPLOAD_FOLDER_BASE_URL, API_BASE_URL };
export default stables;
