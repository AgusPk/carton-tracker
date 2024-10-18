import Transfer from '@/models/transfer';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { from, to, amount, cardId } = body;

    const transfer = new Transfer({
      from,
      to,
      amount,
      cardId,
    });

    await transfer.save();

    return new NextResponse(JSON.stringify(transfer), {
      status: 201,
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error }), {
      status: 500,
    });
  }
}

export async function GET(req: Request) {
  try {
    // Parse the URL to get query parameters
    const { searchParams } = new URL(req.url);
    const from = searchParams.get('from');
    const to = searchParams.get('to');

    // Build a query object based on the 'from' or 'to' filters
    const query: { from?: string; to?: string } = {};
    if (from) query.from = from; // Filter transfers by 'from'
    if (to) query.to = to; // Filter transfers by 'to'

    // Find transfers based on the query
    const transfers = await Transfer.find(query);

    return new NextResponse(JSON.stringify(transfers), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error }), {
      status: 500,
    });
  }
}
