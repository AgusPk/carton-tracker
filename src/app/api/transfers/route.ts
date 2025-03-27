import Transfer from '@/models/transfer';
import { NextResponse } from 'next/server';
import { z } from 'zod';

// Define the validation schema
const CardSchema = z.object({
  id: z.string(),
  name: z.string(),
  count: z.number().int().positive(),
  imageUrl: z.string().url(),
  comment: z.string().optional()
});

const TransferSchema = z.object({
  from: z.string(),
  to: z.string(),
  list: z.array(CardSchema)
});

const GetQuerySchema = z.object({
  from: z.string().optional(),
  to: z.string().optional()
}).refine(data => data.from || data.to, {
  message: "At least one filter (from or to) must be provided"
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log({body})
    // Validate the request body
    const validationResult = TransferSchema.safeParse(body);
    
    if (!validationResult.success) {
      return new NextResponse(
        JSON.stringify({ 
          error: 'Invalid request data', 
          details: validationResult.error.errors 
        }), 
        { status: 400 }
      );
    }

    const { from, to, list } = validationResult.data;

    for(const card of list) {
      const transfer = new Transfer({
        from,
        to,
        amount: card.count,
        cardId: card.id,
        cardName: card.name,
        cardImage: card.imageUrl,
        comment: card.comment,
      });
      await transfer.save();
    }

    return new NextResponse(JSON.stringify({message: 'transfers created'}), {
      status: 201,
    });
  } catch (error) {
    console.log({ error });
    return new NextResponse(JSON.stringify({ error }), {
      status: 500,
    });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    
    // Create an object from the search params
    const queryParams = {
      from: searchParams.get('from') || undefined,
      to: searchParams.get('to') || undefined
    };

    // Validate query parameters
    const validationResult = GetQuerySchema.safeParse(queryParams);
    
    if (!validationResult.success) {
      return new NextResponse(
        JSON.stringify({ 
          error: 'Invalid query parameters', 
          details: validationResult.error.errors 
        }), 
        { status: 400 }
      );
    }

    const { from, to } = validationResult.data;

    // Build a query object based on the validated parameters
    const query: { from?: string; to?: string } = {};
    if (from) query.from = from;
    if (to) query.to = to;

    const transfers = await Transfer.find(query);

    return new NextResponse(JSON.stringify(transfers), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
    });
  }
}
