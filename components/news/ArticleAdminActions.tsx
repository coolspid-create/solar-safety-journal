'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { Edit } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface ArticleAdminActionsProps {
    articleId: string;
}

export default function ArticleAdminActions({ articleId }: ArticleAdminActionsProps) {
    const { user } = useAuth();

    if (!user) {
        return null;
    }

    return (
        <div className="absolute top-4 right-4 z-20">
            <Link href={`/admin/edit/${articleId}`}>
                <Button
                    variant="outline"
                    className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 hover:text-white"
                    size="sm"
                >
                    <Edit size={16} className="mr-2" />
                    기사 수정
                </Button>
            </Link>
        </div>
    );
}
