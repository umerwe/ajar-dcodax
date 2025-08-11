"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Star, Users, Bed, Wifi, Clock, Info } from 'lucide-react';
import Header from "@/components/pages/listing-details/header";
import GuestInformationFields from "@/components/forms/guest-information-fields";
import PriceDetails from "@/components/pages/check-out/price-details";
import PaymentFields from "@/components/forms/payment-fields";
import CheckInOutTime from "@/components/pages/check-out/check-in-out-time";
import { propertiesData } from "@/data/properties-data";
import { vehiclesData } from "@/data/vehicles-data";
import { roomsData } from "@/data/rooms-data";
import { appartmentsData } from "@/data/appartments-data";
import Image from "next/image";
import CancellationPolicy from "@/components/pages/check-out/cancellation-policy";
import { Button } from "@/components/ui/button";
import { CombinedFormData, combinedSchema } from "@/validations/checkout";
import { useParams } from "next/navigation";

// interface ListingProps {
//     params: Promise<{ id: string; category: string }>;
// }

interface ListingData {
    id: string;
    title?: string;
    images: string[];
    rating?: number;
    reviewCount?: number;
    beds?: number;
    guests?: number;
    passengers?: number;
    features?: string[];
    area?: string;
    freeCancellation?: boolean;
}

const CheckoutPage = () => {
    const params = useParams();

    // Access values like this (they are strings)
    const id = params?.id;
    const category = params?.category;
    let listingsData: ListingData[] = [];
    switch (category) {
        case "prp567":
            listingsData = propertiesData as ListingData[];
            break;
        case "veh341":
            listingsData = vehiclesData as ListingData[];
            break;
        case "room567":
            listingsData = roomsData as ListingData[];
            break;
        case "aprt987":
            listingsData = appartmentsData as ListingData[];
            break;
        default:
            listingsData = [];
    }

    const matchingListings = listingsData.filter((item) => item.id === id);
    if (matchingListings.length === 0) {
        return (
            <div className="p-10 text-center text-gray-600">
                No listing found with ID: <b>{id}</b>
            </div>
        );
    }

    const listing = matchingListings[0];

    // Derive fields for display
    const isVehicle = category === "veh341";
    const roomType = isVehicle ? "Vehicle Rental" : listing.title || "Standard Room";
    const bedType = isVehicle ? "N/A" : listing.beds ? `${listing.beds} ${listing.beds === 1 ? "Bed" : "Beds"}` : "1 Double Bed";
    const guestsOrPassengers = isVehicle ? listing.passengers || 4 : listing.guests || 2;
    const inclusions = listing.features?.slice(0, 3) || ["Free WiFi", "Air Conditioning", "Parking"];
    const roomSize = isVehicle ? "N/A" : listing.area || "Unknown";
    const checkInDate = "Wed, May 7";
    const checkInTime = "14:00-23:00";
    const checkOutDate = "Fri, May 8";
    const checkOutTime = "12:00-18:00";
    const cancellationPolicy = listing.freeCancellation ? "Free Cancellation" : "Non-refundable";
    const cancellationDescription = listing.freeCancellation
        ? "You can cancel this booking for free up to 48 hours before check-in."
        : "This booking cannot be modified, and no refund will be given if you cancel it. If you fail to check in, a penalty equivalent to the cancellation fee will be charged.";

    return <CheckoutPageClient
        listing={listing}
        isVehicle={isVehicle}
        roomType={roomType}
        bedType={bedType}
        guestsOrPassengers={guestsOrPassengers}
        inclusions={inclusions}
        roomSize={roomSize}
        checkInDate={checkInDate}
        checkInTime={checkInTime}
        checkOutDate={checkOutDate}
        checkOutTime={checkOutTime}
        cancellationPolicy={cancellationPolicy}
        cancellationDescription={cancellationDescription}
    />;
};

interface CheckoutPageClientProps {
    listing: ListingData;
    isVehicle: boolean;
    roomType: string;
    bedType: string;
    guestsOrPassengers: number;
    inclusions: string[];
    roomSize: string;
    checkInDate: string;
    checkInTime: string;
    checkOutDate: string;
    checkOutTime: string;
    cancellationPolicy: string;
    cancellationDescription: string;
}

const CheckoutPageClient = ({
    listing,
    isVehicle,
    roomType,
    bedType,
    guestsOrPassengers,
    inclusions,
    roomSize,
    checkInDate,
    checkInTime,
    checkOutDate,
    checkOutTime,
    cancellationPolicy,
    cancellationDescription
}: CheckoutPageClientProps) => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<CombinedFormData>({
        resolver: zodResolver(combinedSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            countryCode: "+1",
            phoneNumber: "",
            name: '',
            expiryDate: '',
            billingZip: '',
            paymentOption: "full",
            cardType: "VISA",
        },
    });

    const onSubmit = (data: CombinedFormData) => {
        console.log("Complete Booking Form Submitted:", data);
    };

    return (
        <div className="min-h-screen mx-3 sm:mx-7 mb-20">
            <div className="max-w-7xl mx-auto">
                <Header title="Checkout" />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-12">
                        {/* Left Column - Form */}
                        <div className="space-y-6">
                            {/* Guest Information */}
                            <div className="bg-white rounded-lg px-2 py-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                                    {"Who's checking in?"}
                                </h2>
                                <div className="mb-4">
                                    <p className="text-sm text-gray-700 font-semibold mb-2">
                                        <span className="text-red-800 mr-1">*</span>
                                        Required
                                    </p>
                                    <button type="button" className="text-sm text-aqua hover:text-teal-700 font-medium">
                                        Sign in for faster checkout
                                    </button>
                                </div>
                                <GuestInformationFields
                                    register={register}
                                    setValue={setValue}
                                    errors={errors}
                                />
                            </div>
                            <PaymentFields
                                register={register}
                                setValue={setValue}
                                errors={errors}
                            />
                            <CancellationPolicy />
                            <Button
                                type="submit"
                                variant="destructive"
                                className="w-full sm:w-auto md:w-full lg:w-auto px-9">
                                Complete Booking
                            </Button>
                        </div>
                        {/* Right Column - Booking Summary */}
                        <div className="space-y-6 px-2 lg:px-12 mb-20">
                            {/* Listing Information */}
                            <div className="bg-white rounded-lg py-2">
                                <div className="flex gap-4 mb-4">
                                    <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0 relative">
                                        <Image
                                            src={listing.images[0] || "/placeholder.svg"}
                                            alt={listing.title || "Listing Image"}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg font-semibold text-gray-900 sm:mb-1">
                                            {listing.title || "Untitled Listing"}
                                        </h3>
                                        <div className="flex items-center gap-1 mb-2">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`w-4 h-4 ${i < Math.floor(listing.rating || 0)
                                                        ? "fill-yellow-400 text-yellow-400"
                                                        : "text-gray-300"
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="bg-teal-500 text-white px-2.5 py-1 rounded text-sm font-medium rounded-l-full rounded-b-full">
                                                {(listing.rating || 0).toFixed(1)}/5
                                            </span>
                                            <span className="text-md font-medium text-teal-600">
                                                {(listing.rating || 0) >= 4.5
                                                    ? "Excellent"
                                                    : (listing.rating || 0) >= 4.0
                                                        ? "Good"
                                                        : "Average"}
                                            </span>
                                            <span className="text-sm text-gray-500">
                                                {listing.reviewCount || 0} reviews
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                {/* Room/Vehicle Details */}
                                <div className="pt-4">
                                    <h4 className="font-semibold text-gray-900 mb-1 sm:mb-3">{roomType}</h4>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <Users className="w-4 h-4 text-gray-400" />
                                            <span className="text-gray-600">x{guestsOrPassengers}</span>
                                            {!isVehicle && (
                                                <>
                                                    <span className="text-gray-400">•</span>
                                                    <span className="text-gray-900 cursor-pointer">
                                                        <u>{bedType}</u>
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="text-teal-600 font-medium">
                                                {inclusions[0] || "N/A"}
                                            </span>
                                            <span className="text-gray-400">•</span>
                                            <Wifi className="w-4 h-4 text-gray-400" />
                                            <span className="text-gray-600">{inclusions[1] || "N/A"}</span>
                                            <span className="text-gray-400">•</span>
                                            <span className="text-gray-600">{inclusions[2] || "N/A"}</span>
                                        </div>
                                        <div className="text-gray-600">{roomSize}</div>
                                    </div>
                                    <div className="flex items-center gap-1 mt-3 text-gray-900 cursor-pointer">
                                        <Info className="w-4 h-4" />
                                        <span className="text-sm">
                                            <u>{cancellationPolicy}</u>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            {/* Check-in/Check-out Time */}
                            <div className="bg-white rounded-lg px-2 sm:px-6">
                                <div className="flex flex-wrap justify-between gap-4">
                                    <CheckInOutTime
                                        date={checkInDate}
                                        time={checkInTime}
                                        icon={<Clock className="w-4 h-4 text-gray-400" />}
                                        label={isVehicle ? "rental day" : "night"}
                                        options={[
                                            { value: 1, label: `1 ${isVehicle ? "day" : "night"}` },
                                            { value: 2, label: `2 ${isVehicle ? "days" : "nights"}` },
                                            { value: 3, label: `3 ${isVehicle ? "days" : "nights"}` },
                                        ]}
                                    />
                                    <CheckInOutTime
                                        date={checkOutDate}
                                        time={checkOutTime}
                                        icon={<Bed className="w-4 h-4 text-gray-400" />}
                                        label={isVehicle ? "vehicle" : "room"}
                                        options={[
                                            { value: 1, label: `1 ${isVehicle ? "vehicle" : "room"}` },
                                            { value: 2, label: `2 ${isVehicle ? "vehicles" : "rooms"}` },
                                            { value: 3, label: `3 ${isVehicle ? "vehicles" : "rooms"}` },
                                        ]}
                                    />
                                </div>
                            </div>
                            <PriceDetails />
                            {/* Cancellation Policy */}
                            <div className="bg-white rounded-lg sm:p-6">
                                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                                    Cancellation Policy
                                </h4>
                                <div className="mb-3">
                                    <span className="text-sm font-semibold text-gray-900">
                                        {cancellationPolicy}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600 leading-relaxed max-w-90">
                                    {cancellationDescription}
                                </p>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CheckoutPage;
