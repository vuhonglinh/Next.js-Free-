import { z } from "zod"

const configSchema = z.object({
    NEXT_PUBLIC_API_ENDPOINT: z.string(),
    NEXT_PUBLIC_URL: z.string(),
})

//Hàm safeParse của zod được sử dụng để xác thực process.env theo schema đã định nghĩa. Kết quả trả về của safeParse là một đối tượng có thể có hai dạng:
export const configProject = configSchema.safeParse({
    NEXT_PUBLIC_API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT,
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
})

if (!configProject.success) {
    throw new Error("Các giá trị khai báo trong file .env không hợp lệ")
}

//Nếu đúng trả về data chứa tất cả các biến môi trường trong file .env
const envConfig = configProject.data
export default envConfig;
