export interface ChatMessage {
    message: string;
    user: string;
    senderId?: string;
    file?: File;
    fileContent?: ArrayBuffer | null; // For storing file content
    fileType?: string; // For storing file type (e.g., image, video)
}