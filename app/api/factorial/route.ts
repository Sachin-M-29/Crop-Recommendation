// app/api/factorial/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { factorial } from '../../lib/factorial';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const nParam = searchParams.get('n');

    if (nParam === null) {
        return NextResponse.json(
            { success: false, error: 'Query parameter "n" is required. Example: /api/factorial?n=5' },
            { status: 400 }
        );
    }

    const n = Number(nParam);

    if (Number.isNaN(n)) {
        return NextResponse.json(
            { success: false, error: '"n" must be a valid number' },
            { status: 400 }
        );
    }

    try {
        const result = factorial(n);
        return NextResponse.json({ success: true, n, result });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : 'Invalid input' },
            { status: 400 }
        );
    }
}
