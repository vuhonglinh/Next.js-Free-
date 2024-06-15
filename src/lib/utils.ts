import { toast } from "@/components/ui/use-toast"
import { EntityError } from "@/lib/http"
import { type ClassValue, clsx } from "clsx"
import { UseFormSetError } from "react-hook-form"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const handleErrorApi = ({ error, setError, duration }: {
  error?: any, setError?: UseFormSetError<any>, duration?: number
}) => {
  //Nếu nó thuộc kiểu dữ liệu của EntityError && truyền vào setError
  if (error instanceof EntityError && setError) {
    error.payload.errors.forEach(err => {
      setError(err.field, {
        type: 'server',
        message: err.message,
      })
    })
  } else {
    toast({
      title: 'Lỗi',
      description: error.message ?? 'Lỗi không xác định',
      variant: 'destructive',
      duration: duration ?? 5000
    })
  }
}


/**
 * Xóa đi ký tự đầu tiên / của path 
 * slice() lấy phần tử số 1 -> hết
 */
export const mormalizePath = (path: string) => {
  return path.startsWith('/') ? path.slice(1) : path
}
