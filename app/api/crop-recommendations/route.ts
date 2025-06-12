// app/api/crop-recommendations/route.ts
import { NextRequest, NextResponse } from 'next/server';

interface CropFormData {
    crops: string;
    previousCrop: string;
    rainfall: string;
    porosity: string;
    temperature: string;
    soilType: string;
    acreage: string;
}

interface APIResponse {
    success: boolean;
    recommendation: string;
    inputData: CropFormData;
    timestamp: string;
    error?: string;
}

// Simple crop recommendation logic
function generateCropRecommendation(data: CropFormData): string {
    const rainfall = parseFloat(data.rainfall);
    const temperature = parseFloat(data.temperature);
    const porosity = parseFloat(data.porosity);
    const acreage = parseFloat(data.acreage);

    const recommendations = [];

    // Rice recommendations
    if (rainfall > 1000 && temperature > 20 && temperature < 35 && data.soilType === 'Clay') {
        recommendations.push("🌾 **Rice** - Excellent choice! Your high rainfall and clay soil are perfect for rice cultivation.");
    }

    // Wheat recommendations
    if (rainfall > 300 && rainfall < 1000 && temperature > 10 && temperature < 25 && ['Loamy', 'Sandy'].includes(data.soilType)) {
        recommendations.push("🌾 **Wheat** - Great option for your climate conditions and soil type.");
    }

    // Corn recommendations
    if (rainfall > 500 && temperature > 15 && temperature < 30 && ['Loamy', 'Silty'].includes(data.soilType)) {
        recommendations.push("🌽 **Corn/Maize** - Well-suited for your rainfall and temperature conditions.");
    }

    // Cotton recommendations
    if (rainfall > 400 && rainfall < 1200 && temperature > 20 && temperature < 35 && porosity > 40) {
        recommendations.push("🌿 **Cotton** - Good porosity and climate conditions for cotton cultivation.");
    }

    // Sugarcane recommendations
    if (rainfall > 1000 && temperature > 20 && temperature < 40 && ['Loamy', 'Clay'].includes(data.soilType)) {
        recommendations.push("🎋 **Sugarcane** - High rainfall and warm temperature are ideal for sugarcane.");
    }

    // Barley recommendations
    if (rainfall > 200 && rainfall < 800 && temperature > 5 && temperature < 20 && ['Loamy', 'Sandy'].includes(data.soilType)) {
        recommendations.push("🌾 **Barley** - Cool climate and moderate rainfall suit barley cultivation.");
    }

    // Soybean recommendations
    if (rainfall > 400 && temperature > 15 && temperature < 30 && porosity > 35) {
        recommendations.push("🌱 **Soybean** - Good drainage and moderate climate conditions are favorable.");
    }

    // Tomato recommendations
    if (temperature > 18 && temperature < 30 && ['Loamy', 'Sandy'].includes(data.soilType) && porosity > 40) {
        recommendations.push("🍅 **Tomato** - Well-drained soil and moderate temperature are perfect for tomatoes.");
    }

    // Potato recommendations
    if (temperature > 10 && temperature < 25 && ['Loamy', 'Sandy'].includes(data.soilType) && porosity > 35) {
        recommendations.push("🥔 **Potato** - Cool climate and well-drained soil are ideal for potato cultivation.");
    }

    // Default recommendations if no specific matches
    if (recommendations.length === 0) {
        if (rainfall < 400) {
            recommendations.push("🌵 **Drought-resistant crops** like millet, sorghum, or chickpeas would be suitable for low rainfall conditions.");
        } else if (rainfall > 1500) {
            recommendations.push("🌾 **Water-loving crops** like rice or sugarcane would thrive in high rainfall conditions.");
        } else {
            recommendations.push("🌱 **General crops** like maize, wheat, or legumes would be suitable for your conditions.");
        }
    }

    // Crop rotation advice based on previous crop
    let rotationAdvice = "";
    const prevCrop = data.previousCrop.toLowerCase();
    if (prevCrop.includes('rice') || prevCrop.includes('wheat')) {
        rotationAdvice = "\n\n**Crop Rotation Advice:** Consider legumes (beans, peas) to restore soil nitrogen after cereal crops.";
    } else if (prevCrop.includes('legume') || prevCrop.includes('bean') || prevCrop.includes('pea')) {
        rotationAdvice = "\n\n**Crop Rotation Advice:** Following legumes, you can grow nitrogen-demanding crops like corn or leafy vegetables.";
    }

    // Acreage considerations
    let acreageAdvice = "";
    if (acreage < 2) {
        acreageAdvice = "\n\n**Small Farm Optimization:** Consider high-value crops like vegetables, herbs, or specialty crops for better returns per acre.";
    } else if (acreage > 10) {
        acreageAdvice = "\n\n**Large Farm Strategy:** You can consider mechanized farming for staple crops like wheat, corn, or rice for efficiency.";
    }

    // Soil-specific advice
    let soilAdvice = "";
    switch (data.soilType) {
        case 'Clay':
            soilAdvice = "\n\n**Clay Soil Tips:** Ensure proper drainage, consider raised beds for better root development.";
            break;
        case 'Sandy':
            soilAdvice = "\n\n**Sandy Soil Tips:** Focus on water retention, add organic matter, consider drip irrigation.";
            break;
        case 'Loamy':
            soilAdvice = "\n\n**Loamy Soil Advantage:** You have ideal soil! Most crops will thrive with proper care.";
            break;
    }

    return recommendations.join('\n\n') + rotationAdvice + acreageAdvice + soilAdvice +
        `\n\n**Growing Season Planning:** Based on your ${temperature}°C average temperature, plan your planting calendar accordingly.` +
        `\n\n**Irrigation Planning:** With ${rainfall}mm annual rainfall, ${rainfall < 600 ? 'supplemental irrigation will be essential' : 'natural rainfall should meet most water needs'}.`;
}

export async function POST(request: NextRequest) {
    try {
        console.log('API route hit - POST /api/crop-recommendations');

        const body: CropFormData = await request.json();
        console.log('Received data:', body);

        // Validate required fields
        const requiredFields = ['previousCrop', 'rainfall', 'porosity', 'temperature', 'soilType', 'acreage'];
        const missingFields = requiredFields.filter(field => !body[field as keyof CropFormData]);

        if (missingFields.length > 0) {
            return NextResponse.json({
                success: false,
                error: `Missing required fields: ${missingFields.join(', ')}`,
                recommendation: '',
                inputData: body,
                timestamp: new Date().toISOString()
            } as APIResponse, { status: 400 });
        }

        // Generate recommendation
        const recommendation = generateCropRecommendation(body);

        const response: APIResponse = {
            success: true,
            recommendation,
            inputData: body,
            timestamp: new Date().toISOString()
        };

        console.log('Sending response:', response);

        return NextResponse.json(response, {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });

    } catch (error) {
        console.error('API Error:', error);

        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : 'Internal server error',
            recommendation: '',
            inputData: {} as CropFormData,
            timestamp: new Date().toISOString()
        } as APIResponse, { status: 500 });
    }
}

export async function GET() {
    return NextResponse.json({
        message: 'Crop Recommendations API is running',
        timestamp: new Date().toISOString(),
        endpoints: {
            'POST /api/crop-recommendations': 'Submit crop data for recommendations'
        }
    });
}
