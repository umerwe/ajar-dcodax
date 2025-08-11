import { Card } from "@/components/ui/card"
import CardHeader from "./card-header"
import CardFooter from "./card-footer"
import CardBody from "./card-body"

const MainCard = ({ listings }: {listings : Listing[]}) => {
  return (
    <div className="min-h-[400px]">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 3xl:grid-cols-6 gap-4 p-4 w-full">
        {listings.map((property, index) => (
          <Card
            key={property._id || index}
            className="w-full sm:max-w-[320px] mx-auto border-0 bg-white shadow-sm hover:shadow-md transition-shadow duration-200 pb-0"
          >
            <div className="flex sm:block items-center min-[500px]:gap-2">
              <div className="w-[40%] min:[500px]:w-[35%] sm:w-full">
                <CardHeader property={property} />
              </div>
              <div className="flex flex-col sm:mt-0 gap-2 w-[60%] min:[500px]:w-[65%] sm:w-full">
                <CardBody property={property} />
                <CardFooter property={property} />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default MainCard
