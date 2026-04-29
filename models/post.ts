export interface PostData {
    business_name: string
    business_street: string
    business_suburb: string
    business_city: string
    created_at: string
    tags: string
    pet_friendly: boolean
    kid_friendly: boolean
    vegan: boolean
    gluten_free: boolean
    favourite: boolean
    outdoor: boolean
    indoor: boolean
    smoking: boolean
    venue_type: string
    parking: boolean
    image_url: string
    created_by: string
    created_by_image: string
    review: string
}

export interface Post extends PostData {
    id: number
}