"use client"

import accountApiRequest from "@/api.request/account";
import { useEffect } from "react"

export default function Profile() {
  useEffect(() => {
    const fetchRequest = async () => {
      const result = await accountApiRequest.meClient()
    }
    fetchRequest()
  }, [])
  return (
    <div>Profile</div>
  )
}
