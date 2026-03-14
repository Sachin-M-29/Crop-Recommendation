// app/api/factorial/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { factorial } from '@/lib/utils';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const nParam = searchParams.get('n');

    if (nParam === null) {
        return NextResponse.json(
            { success: false, error: 'Query parameter "n" is required' },
            { status: 400 }
        );
    }

    const n = parseInt(nParam, 10);

    if (isNaN(n)) {
        return NextResponse.json(
            { success: false, error: 'Query parameter "n" must be a valid integer' },
            { status: 400 }
        );
    }
    try {
        const result = factorial(n);
        return NextResponse.json({ success: true, n, result });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Invalid input',
            },
            { status: 400 }
        );
    }
}
