import { ChartBarIcon, Check, Flame } from "lucide-react"
import { mostPopularAmenities, moreAmenitiesCategories, restaurantInfo } from "@/data/amenities"

const ServicesAmenities = () => {
  return (
    <div className=" p-6 bg-white">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Services & Amenities</h1>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Flame />
          <h2 className="text-lg font-semibold text-gray-900">Most Popular Amenities</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mx-auto">
          {mostPopularAmenities.map((amenity) => {
            const IconComponent = amenity.icon;
            return (
              <div key={amenity.id} className="flex items-center gap-2 text-sm">
                <IconComponent className="w-4 h-4 text-gray-600 flex-shrink-0" />

                {/* Text + badge */}
                <div className="flex items-center gap-[10px] flex-wrap">
                  <span className="text-gray-700 cursor-pointer">{amenity.name}</span>

                  {amenity.isFree && (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">Free</span>
                  )}
                  {amenity.hasAdditionalCharge && (
                    <span className="text-xs text-blue-600 font-medium">Additional charge</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>


      </div>

      {/* Restaurant Section */}
      <div className="mb-8 pb-6 max-w-70">
        <div className="flex items-center gap-2 mb-3">
          <restaurantInfo.icon className="w-5 h-5 text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-900">{restaurantInfo.title}</h2>
        </div>
        <div className="p-4 rounded-lg border border-gray-200">
          <h3 className="font-medium text-gray-900 mb-2">Restaurant</h3>
          <p className="text-sm text-gray-600">{restaurantInfo.description}</p>
        </div>
      </div>

      {/* More Amenities */}
      <div>
        <div className="flex items-center gap-2 mb-6">
         <ChartBarIcon />
          <h2 className="text-lg font-semibold text-gray-900">More Amenities</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {moreAmenitiesCategories.map((category) => {
            const CategoryIcon = category.icon
            return (
              <div key={category.id} className="space-y-3">
                <div className="flex items-center gap-2">
                  <CategoryIcon className="w-5 h-5 text-gray-600" />
                  <h3 className="font-semibold text-gray-900">{category.title}</h3>
                </div>
                <div className="space-y-2">
                  {category.amenities.map((amenity) => {
                    const AmenityIcon = amenity.icon
                    return (
                      <div key={amenity.id} className="flex items-start gap-3 text-sm">
                        <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <AmenityIcon className="w-4 h-4 text-gray-600 flex-shrink-0" />
                            <span className="text-gray-700">{amenity.name}</span>
                          </div>
                          {amenity.description && (
                            <p className="text-xs text-gray-500 mt-1 ml-6">{amenity.description}</p>
                          )}
                          <div className="flex items-center gap-2 mt-1">
                            {amenity.isFree && (
                              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                                Free
                              </span>
                            )}
                            {amenity.hasAdditionalCharge && (
                              <span className="text-xs text-blue-600 font-medium">Additional charge</span>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ServicesAmenities
