"use client";
import React, { useState,useEffect } from 'react';
import Link from "next/link";


export default function Counter() {

    interface CropFormData {
    crops: string;
    previousCrop: string;
    rainfall: string;
    porosity: string;
    temperature: string;
    soilType: string;
    acreage: string;
}
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
    const [isValid, setIsValid] = useState(true);

// useEffect to validate form whenever cropData changes
    
    const handleSubmit = () => {
        if (isValid) {
            alert('Form submitted successfully!');
            console.log('Submitted data:', cropData);
            setIsValid(true);
        } else {
            alert('Please fix all errors before submitting');
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
    };

    const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
) => {
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

useEffect(() => {
        console.log('Crop data updated:', cropData);
    }, [cropData]);

    return (
<div className="min-h-screen bg-white py-16 px-6 md:px-12">
     <Link
              href="/"
              className="inline-block mt-8 text-green-600 hover:text-green-800 font-medium transition-colors duration-200"
            >
              ← Back to Home
              </Link>
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">

            
            <h2 className="text-2xl font-bold text-green-700 mb-6">Crop Recommendations Form</h2>
            
            <div className="space-y-4">
                {/* Current Crop */}
                
                {/* Previous Crop */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Previous Crop:
                    </label>
                    <input
                        type="text"
                        name="previousCrop"
                        onChange={handleChange}
                        value={cropData.previousCrop}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-black ${
                            errors.previousCrop ? 'border-red-500' : 'border-gray-300'
                        }
                        }`}
                        placeholder="Enter previous crop"
                    />
                    {errors.previousCrop && <p className="text-red-500 text-sm mt-1">{errors.previousCrop}</p>}
                </div>

                {/* Rainfall */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Rainfall (mm):
                    </label>
                    <input
                        type="number"
                        name="rainfall"
                        onChange={handleChange}
                        value={cropData.rainfall}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-black ${
                            errors.rainfall ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter annual rainfall"
                        min="0"
                        step="0.1"
                    />
                    {errors.rainfall && <p className="text-red-500 text-sm mt-1">{errors.rainfall}</p>}
                </div>

                {/* Porosity */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Soil Porosity (%):
                    </label>
                    <input
                        type="number"
                        name="porosity"
                        onChange={handleChange}
                        value={cropData.porosity}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-black ${
                            errors.porosity ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter soil porosity (0-100)"
                        min="0"
                        max="100"
                        step="0.1"
                    />
                    {errors.porosity && <p className="text-red-500 text-sm mt-1">{errors.porosity}</p>}
                </div>

                {/* Temperature */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Temperature (°C):
                    </label>
                    <input
                        type="number"
                        name="temperature"
                        onChange={handleChange}
                        value={cropData.temperature}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-black ${
                            errors.temperature ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter average temperature"
                        step="0.1"
                    />
                    {errors.temperature && <p className="text-red-500 text-sm mt-1">{errors.temperature}</p>}
                </div>

                {/* Soil Type */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Soil Type:
                    </label>
                    <select
                        name="soilType"
                        onChange={handleChange}
                        value={cropData.soilType}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-black ${
                            errors.soilType ? 'border-red-500' : 'border-gray-300'
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
                    {errors.soilType && <p className="text-red-500 text-sm mt-1">{errors.soilType}</p>}
                </div>

                {/* Acreage */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Land Area (acres):
                    </label>
                    <input
                        type="number"
                        name="acreage"
                        onChange={handleChange}
                        value={cropData.acreage}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-black ${
                            errors.acreage ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter land area in acres"
                        min="0"
                        step="0.1"
                    />
                    {errors.acreage && <p className="text-red-500 text-sm mt-1">{errors.acreage}</p>}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-6">
                <button
                    onClick={handleSubmit}
                    className={`px-6 py-2 rounded-md font-medium ${
                        isValid 
                            ? 'bg-green-600 text-white hover:bg-green-700' 
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    disabled={!isValid}
                >
                    Submit
                </button>
                <button
                    onClick={resetForm}
                    className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                >
                    Reset
                </button>
            </div>

            {/* Display Current Values */}
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Current Values:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  
                    <p><strong>Previous Crop:</strong> {cropData.previousCrop || 'Not specified'}</p>
                    <p><strong>Rainfall:</strong> {cropData.rainfall ? `${cropData.rainfall} mm` : 'Not specified'}</p>
                    <p><strong>Porosity:</strong> {cropData.porosity ? `${cropData.porosity}%` : 'Not specified'}</p>
                    <p><strong>Temperature:</strong> {cropData.temperature ? `${cropData.temperature}°C` : 'Not specified'}</p>
                    <p><strong>Soil Type:</strong> {cropData.soilType || 'Not selected'}</p>
                    <p><strong>Acreage:</strong> {cropData.acreage ? `${cropData.acreage} acres` : 'Not specified'}</p>
                </div>
                <div className="mt-3">
                    <p className={`text-sm font-medium ${isValid ? 'text-green-600' : 'text-red-600'}`}>
                        Form Status: {isValid ? 'Valid - Ready to Submit' : 'Invalid - Please fix errors'}
                    </p>
                </div>
            </div>
        </div>
        </div>
    );
}