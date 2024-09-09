export type ICountry = {
	uuid: string
	name: string
	iso3: string
	iso2: string
	numericCode: string
	phoneCode: string
	capital: string
	currency: string
	currencyName: string
	currencySymbol: string
	tld: string
	native: string
	region: string
	regionId: string
	subregion: string
	subregionId: string
	nationality: string
	timezones?: Record<string, string | number>
	translations?: Record<string, string | number>
	latitude: number
	longitude: number
	emoji: string
	emojiU: string
}
