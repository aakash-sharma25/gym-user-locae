import { useState } from 'react';
import { supabase } from '@/lib/supabase';

interface DeleteAccountRequest {
    identifier: string;
    message?: string;
}

interface UseDeleteAccountReturn {
    submitRequest: (data: DeleteAccountRequest) => Promise<boolean>;
    isLoading: boolean;
    error: string | null;
    isSuccess: boolean;
    reset: () => void;
}

export function useDeleteAccount(): UseDeleteAccountReturn {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);

    const submitRequest = async (data: DeleteAccountRequest): Promise<boolean> => {
        setIsLoading(true);
        setError(null);
        setIsSuccess(false);

        try {
            // Validate email
            const email = data.identifier.trim().toLowerCase();
            if (!email) {
                throw new Error('Please enter your email address');
            }

            // Email validation
            const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

            if (!isValidEmail) {
                throw new Error('Please enter a valid email address');
            }

            // Insert the deletion request
            const { error: insertError } = await supabase
                .from('account_deletion_requests')
                .insert({
                    identifier: email,
                    message: data.message?.trim() || null,
                });

            if (insertError) {
                console.error('Error submitting deletion request:', insertError);
                throw new Error('Failed to submit request. Please try again later.');
            }

            setIsSuccess(true);
            return true;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
            setError(errorMessage);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const reset = () => {
        setIsLoading(false);
        setError(null);
        setIsSuccess(false);
    };

    return {
        submitRequest,
        isLoading,
        error,
        isSuccess,
        reset,
    };
}
