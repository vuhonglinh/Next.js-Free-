"use client"
import authApiRequest from "@/api.request/auth";
import { Button } from "@/components/ui/button";
import { clientSessionToken } from "@/lib/http";
import { useEffect } from "react";
import { differenceInHours } from 'date-fns'

export default function SlideSession() {

    useEffect(() => {
        const interval = setInterval(async () => {
            const now = new Date();
            const expiresAt = new Date(clientSessionToken.expiresAt)

            if (differenceInHours(expiresAt, now) < 1) {
                const res = await authApiRequest.slideSessionFormNextClientToServer();
                clientSessionToken.expiresAt = res.payload.data.expiresAt;
            }

            return () => {
                clearInterval(interval);
            }

        }, 1000 * 60 * 60)
    }, [])
    return null
}
