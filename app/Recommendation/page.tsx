"use client";
import React, { useState, useEffect, useCallback } from 'react';
import Link from "next/link";

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

export default function CropRecommendationForm() {
    const [cropData, setCropData] = useState<CropFormData>({
        crops: "",
        previousCrop: "",
        rainfall: "",
        porosity: "",
        temperature: "",
        soilType: "",
        acreage: ""
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isValid, setIsValid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [recommendation, setRecommendation] = useState<string>("");
    const [showRecommendation, setShowRecommendation] = useState(false);

    // Form validation
    const validateForm = useCallback(() => {
        const newErrors: { [key: string]: string } = {};

        if (!cropData.previousCrop.trim()) {
            newErrors.previousCrop = "Previous crop is required";
        }

        if (!cropData.rainfall || parseFloat(cropData.rainfall) <= 0) {
            newErrors.rainfall = "Valid rainfall amount is required";
        }

        if (!cropData.porosity || parseFloat(cropData.porosity) < 0 || parseFloat(cropData.porosity) > 100) {
            newErrors.porosity = "Porosity must be between 0-100%";
        }

        if (!cropData.temperature) {
            newErrors.temperature = "Temperature is required";
        }

        if (!cropData.soilType) {
            newErrors.soilType = "Soil type must be selected";
        }

        if (!cropData.acreage || parseFloat(cropData.acreage) <= 0) {
            newErrors.acreage = "Valid land area is required";
        }

        setErrors(newErrors);
        const valid = Object.keys(newErrors).length === 0;
        setIsValid(valid);
        return valid;
    }, [cropData]);

    useEffect(() => {
        validateForm();
    }, [validateForm]);

    const handleSubmit = async () => {
        if (!validateForm()) {
            alert('Please fix all errors before submitting');
            return;
        }

        setIsLoading(true);
        setShowRecommendation(false);

        try {
            console.log('Submitting crop data:', cropData);
            
            // Fixed API endpoint - use relative path for production
            const response = await fetch('/api/crop-recommendations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cropData)
            });

            console.log('Response status:', response.status);
            console.log('Response headers:', response.headers);

            // Check if response is JSON
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                const textResponse = await response.text();
                console.error('Non-JSON response received:', textResponse);
                throw new Error('Server returned non-JSON response. Check API route setup.');
            }

            const data: APIResponse = await response.json();
            console.log('Response data:', data);

            if (data.success) {
                setRecommendation(data.recommendation);
                setShowRecommendation(true);
                // Success notification without alert
                console.log('Crop recommendations generated successfully!');
            } else {
                console.error('API Error:', data.error);
                alert('Error: ' + (data.error || 'Failed to get recommendations'));
            }
        } catch (error) {
            console.error('Submit error:', error);
            if (error instanceof Error) {
                alert('Error: ' + error.message);
            } else {
                alert('Failed to submit form. Please check the console for details.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const resetForm = () => {
        setCropData({
            crops: "",
            previousCrop: "",
            rainfall: "",
            porosity: "",
            temperature: "",
            soilType: "",
            acreage: ""
        });
        setErrors({});
        setRecommendation("");
        setShowRecommendation(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setCropData(prev => ({
            ...prev,
            [name]: value
        }));

        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ""
            }));
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8 px-4 md:px-8">
            <div className="max-w-4xl mx-auto">
                <Link
                    href="/"
                    className="inline-block mb-6 text-green-600 hover:text-green-800 font-medium transition-colors duration-200"
                >
                    ← Back to Home
                </Link>

                <div className="bg-white rounded-lg shadow-xl p-6 md:p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-green-700 mb-2">
                            AI-Powered Crop Recommendations
                        </h1>
                        <p className="text-gray-600">
                            Get personalized crop suggestions based on your farm&apos;s conditions
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Form Section */}
                        <div className="space-y-6">
                            <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
                                Farm Information
                            </h2>

                            {/* Previous Crop */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Previous Crop *
                                </label>
                                <input
                                    type="text"
                                    name="previousCrop"
                                    onChange={handleChange}
                                    value={cropData.previousCrop}
                                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-black transition-colors ${
                                        errors.previousCrop ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                    }`}
                                    placeholder="e.g., Rice, Wheat, Corn"
                                />
                                {errors.previousCrop && (
                                    <p className="text-red-500 text-sm mt-1">{errors.previousCrop}</p>
                                )}
                            </div>

                            {/* Rainfall */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Annual Rainfall (mm) *
                                </label>
                                <input
                                    type="number"
                                    name="rainfall"
                                    onChange={handleChange}
                                    value={cropData.rainfall}
                                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-black transition-colors ${
                                        errors.rainfall ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                    }`}
                                    placeholder="e.g., 1200"
                                    min="0"
                                    step="0.1"
                                />
                                {errors.rainfall && (
                                    <p className="text-red-500 text-sm mt-1">{errors.rainfall}</p>
                                )}
                            </div>

                            {/* Porosity */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Soil Porosity (%) *
                                </label>
                                <input
                                    type="number"
                                    name="porosity"
                                    onChange={handleChange}
                                    value={cropData.porosity}
                                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-black transition-colors ${
                                        errors.porosity ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                    }`}
                                    placeholder="e.g., 45"
                                    min="0"
                                    max="100"
                                    step="0.1"
                                />
                                {errors.porosity && (
                                    <p className="text-red-500 text-sm mt-1">{errors.porosity}</p>
                                )}
                            </div>

                            {/* Temperature */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Average Temperature (°C) *
                                </label>
                                <input
                                    type="number"
                                    name="temperature"
                                    onChange={handleChange}
                                    value={cropData.temperature}
                                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-black transition-colors ${
                                        errors.temperature ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                    }`}
                                    placeholder="e.g., 25"
                                    step="0.1"
                                />
                                {errors.temperature && (
                                    <p className="text-red-500 text-sm mt-1">{errors.temperature}</p>
                                )}
                            </div>

                            {/* Soil Type */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Soil Type *
                                </label>
                                <select
                                    name="soilType"
                                    onChange={handleChange}
                                    value={cropData.soilType}
                                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-black transition-colors ${
                                        errors.soilType ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                    }`}
                                >
                                    <option value="">Select soil type</option>
                                    <option value="Clay">Clay</option>
                                    <option value="Sandy">Sandy</option>
                                    <option value="Loamy">Loamy</option>
                                    <option value="Silty">Silty</option>
                                    <option value="Peaty">Peaty</option>
                                    <option value="Chalky">Chalky</option>
                                </select>
                                {errors.soilType && (
                                    <p className="text-red-500 text-sm mt-1">{errors.soilType}</p>
                                )}
                            </div>

                            {/* Acreage */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Land Area (acres) *
                                </label>
                                <input
                                    type="number"
                                    name="acreage"
                                    onChange={handleChange}
                                    value={cropData.acreage}
                                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-black transition-colors ${
                                        errors.acreage ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                    }`}
                                    placeholder="e.g., 5.5"
                                    min="0"
                                    step="0.1"
                                />
                                {errors.acreage && (
                                    <p className="text-red-500 text-sm mt-1">{errors.acreage}</p>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-4 pt-4">
                                <button
                                    onClick={handleSubmit}
                                    disabled={!isValid || isLoading}
                                    className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                                        isValid && !isLoading
                                            ? 'bg-green-600 text-white hover:bg-green-700 hover:shadow-lg' 
                                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                                >
                                    {isLoading ? (
                                        <span className="flex items-center justify-center">
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Generating Recommendations...
                                        </span>
                                    ) : (
                                        'Get AI Recommendations'
                                    )}
                                </button>
                                <button
                                    onClick={resetForm}
                                    className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200"
                                >
                                    Reset
                                </button>
                            </div>
                        </div>

                        {/* Display Section */}
                        <div className="space-y-6">
                            {/* Current Values */}
                            <div className="bg-gray-50 rounded-lg p-4">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Current Input:</h3>
                                <div className="space-y-2 text-sm">
                                    <p><strong>Previous Crop:</strong> {cropData.previousCrop || 'Not specified'}</p>
                                    <p><strong>Rainfall:</strong> {cropData.rainfall ? `${cropData.rainfall} mm` : 'Not specified'}</p>
                                    <p><strong>Porosity:</strong> {cropData.porosity ? `${cropData.porosity}%` : 'Not specified'}</p>
                                    <p><strong>Temperature:</strong> {cropData.temperature ? `${cropData.temperature}°C` : 'Not specified'}</p>
                                    <p><strong>Soil Type:</strong> {cropData.soilType || 'Not selected'}</p>
                                    <p><strong>Acreage:</strong> {cropData.acreage ? `${cropData.acreage} acres` : 'Not specified'}</p>
                                </div>
                                <div className="mt-4 pt-3 border-t border-gray-200">
                                    <p className={`text-sm font-medium ${isValid ? 'text-green-600' : 'text-red-600'}`}>
                                        Form Status: {isValid ? '✓ Ready to Submit' : '✗ Please complete all fields'}
                                    </p>
                                </div>
                            </div>

                            {/* AI Recommendations */}
                            {showRecommendation && (
                                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                                    <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
                                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                        </svg>
                                        AI Crop Recommendations
                                    </h3>
                                    <div className="prose prose-sm max-w-none text-gray-700">
                                        {recommendation.split('\n').map((line, index) => (
                                            <p key={index} className="mb-2">
                                                {line}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}