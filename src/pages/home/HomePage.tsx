/* eslint-disable max-len */
import FeaturedEventCard from "@/components/FeaturedEventCard.tsx/FeaturedEventCard"
import TopRatedEventCard from "@/components/TopRatedEventCard/TopRatedEventCard"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ArrowRight } from "lucide-react"
import React from "react"
import TicketPNG from "@/assets/icons/ticket.png"
import { Label } from "@/components/ui/label"

function HomePage() {
	return (
		<div>
			<div className='flex items-center justify-center w-full h-full py-10'>
				<div className='relative w-full h-full text-center rounded-3xl'>
					<img src='https://picsum.photos/1440/800' className='w-full h-[164px] lg:h-80 rounded-3xl' />

					{/* Overlay */}
					<div className='absolute top-0 left-0 w-full bg-black opacity-60 rounded-3xl h-[164px] lg:h-80'></div>

					<div className='absolute w-full space-y-6 text-white -translate-x-1/2 -translate-y-1/2 left-1/2 top-20 md:top-1/3 md:left-1/2'>
						<h1 className='text-xl font-bold sm:text-2xl md:text-4xl lg:text-5xl'>
							Discover exciting events near you
						</h1>
						<h4 className='text-sm font-bold sm:text-base md:text-xl lg:text-xl'>
							Find events tailored to your interests and location!
						</h4>
					</div>

					<div className='relative w-full h-full mt-4 md:h-20 md:-translate-y-1/2'>
						<div className='relative flex flex-col w-full h-full gap-8 py-3 mx-auto shadow-sm md:border md:gap-0 md:flex-row md:rounded-full md:w-full lg:w-2/3 bg-background'>
							<div className='flex flex-col items-start justify-center mx-4 md:ml-8 md:flex-grow-[5]'>
								<p className='text-base'>Category</p>
								<p className='text-sm text-muted-foreground'>Whats happening?</p>
							</div>

							<Separator orientation='vertical' className='hidden md:block' />

							<div className='flex flex-col items-start justify-center px-4 md:pl-4 md:flex-grow-[4]'>
								<p className='text-base'>Date</p>
								<p className='text-sm text-muted-foreground'>Select date</p>
							</div>
							<Separator orientation='vertical' className='hidden md:block' />

							<div className='flex flex-col items-start justify-center px-4 md:ml-4 md:flex-grow-[1]'>
								<p className='text-base'>Price</p>
								<p className='text-sm text-muted-foreground'>Is it paid? Is it free?</p>
							</div>

							{/* Button at the end */}
							<Button className='h-full ml-4 mr-4 rounded-full'>
								<ArrowRight />
							</Button>
						</div>
					</div>
				</div>
			</div>
			<div className='relative w-full'>
				<h2 className='mb-4 text-xl font-bold'>Featured Events</h2>
				<div className='grid w-full grid-cols-2 grid-rows-1 gap-4 md:grid-cols-6 md:grid-rows-3 lg:grid-cols-3 lg:grid-rows-2 xl:grid-rows-2 xl:grid-cols-12 xl:max-h-96'>
					<div className='relative w-full col-span-1 row-span-1 md:row-span-2 md:col-span-4 lg:row-span-2 lg:col-span-1 xl:row-span-2 xl:col-span-3 hover:cursor-pointer lg:h-full'>
						<FeaturedEventCard imageUrl='https://picsum.photos/500/500' label='Mountain' />
					</div>
					<div className='relative w-full col-span-1 row-span-1 md:col-span-2 md:row-span-1 lg:row-span-2 lg:col-span-1 xl:row-span-1 xl:col-span-3 hover:cursor-pointer lg:h-full'>
						<FeaturedEventCard imageUrl='https://picsum.photos/501/500' label='Footbal' />
					</div>
					<div className='relative w-full col-span-2 row-span-1 md:col-span-2 md:row-span-1 lg:row-span-2 lg:col-span-1 xl:row-span-2 xl:col-span-3 hover:cursor-pointer lg:h-full'>
						<FeaturedEventCard imageUrl='https://picsum.photos/501/201' label='Events' />
					</div>
					<div className='relative w-full col-span-1 row-span-1 md:col-span-2 md:row-span-1 lg:row-span-1 lg:col-span-1 xl:row-span-1 xl:col-span-3 hover:cursor-pointer lg:h-full'>
						<FeaturedEventCard imageUrl='https://picsum.photos/499/500' label='Food Festival' />
					</div>
					<div className='relative w-full col-span-1 row-span-1 md:col-span-2 lg:row-span-1 lg:col-span-1 xl:row-span-1 xl:col-span-3 hover:cursor-pointer lg:h-full'>
						<FeaturedEventCard imageUrl='https://picsum.photos/500/499' label='Workshop' />
					</div>
					<div className='relative w-full col-span-2 row-span-1 md:col-span-2 lg:col-span-1 lg:row-span-1 xl:row-span-1 xl:col-span-3 hover:cursor-pointer lg:h-full'>
						<FeaturedEventCard imageUrl='https://picsum.photos/501/200' label='Dance' />
					</div>
				</div>
			</div>
			<div className='pt-16'>
				<h2 className='mb-4 text-xl font-bold'>Top-rated Events (Reccurent)</h2>
				<div className='flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:flex-grow'>
					<TopRatedEventCard
						imageUrl='https://picsum.photos/262/204'
						title='Bataie in Camplung'
						location='Babana'
						price={20}
						score={4.2}
					/>
					<TopRatedEventCard
						imageUrl='https://picsum.photos/262/205'
						title='Roster Fight Babana'
						location='Babana'
						price={300}
						score={7.2}
					/>
					<TopRatedEventCard
						imageUrl='https://picsum.photos/262/203'
						title='Culinary Masterclass'
						location='Convention Center'
						price={15}
						score={9.7}
					/>
					<TopRatedEventCard
						imageUrl='https://picsum.photos/261/204'
						title='Outdoor yoga Retreat'
						location='Brasov, Ro'
						price={0}
						score={1.2}
					/>
					<TopRatedEventCard
						imageUrl='https://picsum.photos/263/204'
						title='Week-end Sport'
						location='Cimitiru Babana'
						price={0}
						score={5.2}
					/>
				</div>
			</div>
			<div className='w-full h-full md:h-20 px-10 my-16 py-4 md:py-0 gap-4 md:gap-0 border rounded-3xl md:rounded-full border-border dark:shadow-inner dark:drop-shadow-sm shadow-[#42424238] flex flex-col md:flex-row items-center justify-between'>
				<div className='flex items-center gap-8'>
					<img src={TicketPNG} className='w-12 h-12 m-auto invert dark:invert-0' />
					<div className='flex flex-col'>
						<Label className='text-sm font-bold'>Exclusive Notifications</Label>
						<Label className='text-xs font-normal'>
							Exclusive NotificationsGet access to latest event near you! Join our newsletter now!
						</Label>
					</div>
				</div>
				<Button variant={"outline"} className='w-40 border border-border'>
					Continue
				</Button>
			</div>
		</div>
	)
}

export default HomePage
