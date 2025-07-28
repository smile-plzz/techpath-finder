import { NextResponse } from 'next/server';
import { careerGrowthData } from '@/data/careerGrowth';

export async function GET() {
  try {
    return NextResponse.json({ careerGrowthData });
  } catch (error) {
    console.error('Error fetching career growth data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch career growth data' },
      { status: 500 }
    );
  }
}
