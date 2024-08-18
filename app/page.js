import Movies from "@/components/Movies"

const token = process.env.TMDB_TOKEN

const api = process.env.TMDB_API

async function fetchPopular() {
  const res = await fetch(`${api}/movie/popular`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return await res.json()
}

async function fetchTrending() {
  const res = await fetch(`${api}/trending/movie/day`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return await res.json()
}

export default async function Home() {
  const popular = await fetchPopular()

  const trending = await fetchTrending()

  return (
    <div>
      <h3 className="font-bold border-b mb-4 pb-2">Popular</h3>

      <Movies movies={popular.results} />

      <h3 className="font-bold border-b mb-4 pb-2">Trending</h3>

      <Movies movies={trending.results} />
      
    </div>
  )
}
