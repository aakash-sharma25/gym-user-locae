import { memo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Trash2, AlertTriangle, CheckCircle, Loader2 } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { useGymTheme } from '@/hooks/useGymBranding';
import { useDeleteAccount } from '@/hooks/useDeleteAccount';

const DeleteAccount = memo(() => {
    const { gymName } = useGymTheme();
    const { submitRequest, isLoading, error, isSuccess, reset } = useDeleteAccount();

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await submitRequest({ identifier: email, message });
    };

    const handleReset = () => {
        reset();
        setEmail('');
        setMessage('');
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border"
            >
                <div className="flex items-center gap-3 p-4">
                    <Link
                        to="/login"
                        className="p-2 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                    >
                        <ArrowLeft className="h-5 w-5 text-foreground" />
                    </Link>
                    <div className="flex items-center gap-2">
                        <Trash2 className="h-5 w-5 text-destructive" />
                        <h1 className="text-xl font-bold text-foreground">Account & Data Deletion</h1>
                    </div>
                </div>
            </motion.div>

            {/* Content */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="p-4 pb-8 max-w-lg mx-auto"
            >
                {isSuccess ? (
                    /* Success State */
                    <GlassCard className="p-6" hover={false}>
                        <div className="flex flex-col items-center text-center space-y-4">
                            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                                <CheckCircle className="h-8 w-8 text-green-500" />
                            </div>
                            <h2 className="text-xl font-semibold text-foreground">
                                Request Submitted
                            </h2>
                            <p className="text-muted-foreground">
                                Your request has been received. Our admin team will verify your identity
                                and contact you at <span className="font-medium text-foreground">{email}</span> within 7 business days to confirm the deletion.
                            </p>
                            <div className="mt-2 p-3 rounded-lg bg-muted/50 text-xs text-muted-foreground">
                                <p className="font-medium text-foreground mb-1">What happens next?</p>
                                <ul className="list-disc list-inside space-y-1">
                                    <li>Admin will verify your account ownership</li>
                                    <li>You'll receive a confirmation email</li>
                                    <li>Your data will be deleted after verification</li>
                                </ul>
                            </div>
                            <button
                                onClick={handleReset}
                                className="mt-4 px-4 py-2 rounded-xl bg-muted hover:bg-muted/80 text-foreground transition-colors"
                            >
                                Submit Another Request
                            </button>
                        </div>
                    </GlassCard>
                ) : (
                    /* Form State */
                    <GlassCard className="p-6" hover={false}>
                        <div className="space-y-6">
                            {/* Warning Notice */}
                            <div className="flex gap-3 p-4 rounded-xl bg-destructive/10 border border-destructive/20">
                                <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                                <div className="text-sm">
                                    <p className="font-medium text-destructive mb-1">Important Notice</p>
                                    <p className="text-muted-foreground">
                                        Requesting account deletion will remove your profile, workout history,
                                        diet plans, and attendance records. Transaction records may be retained
                                        for legal purposes.
                                    </p>
                                </div>
                            </div>

                            <div className="border-b border-border pb-4">
                                <h2 className="text-lg font-semibold text-foreground">{gymName}</h2>
                                <p className="text-sm text-muted-foreground mt-1">
                                    Account & Data Deletion Request
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* Email Input */}
                                <div className="space-y-2">
                                    <label
                                        htmlFor="email"
                                        className="text-sm font-medium text-foreground"
                                    >
                                        Email Address <span className="text-destructive">*</span>
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your registered email address"
                                        className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border 
                                                   text-foreground placeholder:text-muted-foreground
                                                   focus:outline-none focus:ring-2 focus:ring-primary/50 
                                                   focus:border-primary transition-all"
                                        required
                                        disabled={isLoading}
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        Our admin team will contact you at this email to verify your identity before processing the deletion.
                                    </p>
                                </div>

                                {/* Message Textarea */}
                                <div className="space-y-2">
                                    <label
                                        htmlFor="message"
                                        className="text-sm font-medium text-foreground"
                                    >
                                        Reason for Deletion (Optional)
                                    </label>
                                    <textarea
                                        id="message"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Tell us why you want to delete your account..."
                                        rows={4}
                                        className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border 
                                                   text-foreground placeholder:text-muted-foreground
                                                   focus:outline-none focus:ring-2 focus:ring-primary/50 
                                                   focus:border-primary transition-all resize-none"
                                        disabled={isLoading}
                                    />
                                </div>

                                {/* Error Message */}
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="p-3 rounded-xl bg-destructive/10 border border-destructive/20"
                                    >
                                        <p className="text-sm text-destructive">{error}</p>
                                    </motion.div>
                                )}

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isLoading || !email.trim()}
                                    className="w-full py-3 px-4 rounded-xl bg-destructive text-destructive-foreground
                                               font-medium transition-all hover:bg-destructive/90
                                               disabled:opacity-50 disabled:cursor-not-allowed
                                               flex items-center justify-center gap-2"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="h-5 w-5 animate-spin" />
                                            Submitting...
                                        </>
                                    ) : (
                                        <>
                                            <Trash2 className="h-5 w-5" />
                                            Submit Deletion Request
                                        </>
                                    )}
                                </button>
                            </form>

                            {/* Footer Note */}
                            <p className="text-xs text-center text-muted-foreground">
                                By submitting this request, you acknowledge that this action cannot be undone
                                once processed. For questions, contact your gym management.
                            </p>
                        </div>
                    </GlassCard>
                )}
            </motion.div>
        </div>
    );
});

DeleteAccount.displayName = 'DeleteAccount';

export default DeleteAccount;
