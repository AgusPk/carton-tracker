import Transfer from '@/models/transfer';
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

export async function PUT(req: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const { id } = params;

    // Validate the id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new NextResponse(
        JSON.stringify({ error: 'Invalid transfer ID' }),
        {
          status: 400,
        }
      );
    }

    // Parse the request body
    const body = await req.json();
    const { from, to, amount, cardId } = body;

    // Find the transfer by id and update it
    const updatedTransfer = await Transfer.findByIdAndUpdate(
      id,
      { from, to, amount, cardId },
      { new: true, runValidators: true } // Return the updated document
    );

    // If no transfer is found, return a 404
    if (!updatedTransfer) {
      return new NextResponse(JSON.stringify({ error: 'Transfer not found' }), {
        status: 404,
      });
    }

    return new NextResponse(JSON.stringify(updatedTransfer), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error }), {
      status: 500,
    });
  }
}

export async function DELETE(req: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const { id } = params;

    // Validate the id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new NextResponse(
        JSON.stringify({ error: 'Invalid transfer ID' }),
        {
          status: 400,
        }
      );
    }

    // Find the transfer by id and delete it
    const deletedTransfer = await Transfer.findByIdAndDelete(id);

    // If no transfer is found, return a 404
    if (!deletedTransfer) {
      return new NextResponse(JSON.stringify({ error: 'Transfer not found' }), {
        status: 404,
      });
    }

    return new NextResponse(JSON.stringify({ message: 'Transfer deleted' }), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error }), {
      status: 500,
    });
  }
}
