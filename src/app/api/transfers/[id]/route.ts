import Transfer from '@/models/transfer';
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { z } from 'zod';

// Define validation schema for MongoDB ObjectId
const ObjectIdSchema = z.string().refine(
  (id) => mongoose.Types.ObjectId.isValid(id),
  { message: "Invalid MongoDB ObjectId format" }
);

// Define validation schema for PUT request body
const UpdateTransferSchema = z.object({
  from: z.string(),
  to: z.string(),
  amount: z.number().int().positive(),
  cardId: z.string(),
  cardName: z.string(),
  cardImage: z.string().url()
});

export async function PUT(req: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const { id } = params;

    // Validate the id using Zod
    const idValidation = ObjectIdSchema.safeParse(id);
    if (!idValidation.success) {
      return new NextResponse(
        JSON.stringify({ 
          error: 'Invalid transfer ID',
          details: idValidation.error.errors 
        }),
        { status: 400 }
      );
    }

    // Parse and validate the request body
    const body = await req.json();
    const bodyValidation = UpdateTransferSchema.safeParse(body);
    
    if (!bodyValidation.success) {
      return new NextResponse(
        JSON.stringify({ 
          error: 'Invalid request data',
          details: bodyValidation.error.errors 
        }),
        { status: 400 }
      );
    }

    const validatedData = bodyValidation.data;

    // Find the transfer by id and update it
    const updatedTransfer = await Transfer.findByIdAndUpdate(
      id,
      validatedData,
      { new: true, runValidators: true }
    );

    if (!updatedTransfer) {
      return new NextResponse(JSON.stringify({ error: 'Transfer not found' }), {
        status: 404,
      });
    }

    return new NextResponse(JSON.stringify(updatedTransfer), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
    });
  }
}

export async function DELETE(req: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const { id } = params;
    console.log('Attempting to delete transfer with ID:', id); // Debug log

    // Validate the id using Zod
    const idValidation = ObjectIdSchema.safeParse(id);
    if (!idValidation.success) {
      console.log('Invalid transfer ID:', idValidation.error); // Debug log
      return new NextResponse(
        JSON.stringify({ 
          error: 'Invalid transfer ID',
          details: idValidation.error.errors 
        }),
        { status: 400 }
      );
    }

    const deletedTransfer = await Transfer.findByIdAndDelete(id);
    console.log('Delete result:', deletedTransfer); // Debug log

    if (!deletedTransfer) {
      console.log('Transfer not found:', id); // Debug log
      return new NextResponse(JSON.stringify({ error: 'Transfer not found' }), {
        status: 404,
      });
    }

    return new NextResponse(JSON.stringify({ message: 'Transfer deleted' }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error in DELETE handler:', error); // Debug log
    return new NextResponse(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
    });
  }
}
