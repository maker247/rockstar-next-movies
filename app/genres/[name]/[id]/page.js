import Movies from "@/components/Movies"

const token = process.env.TMDB_TOKEN

const api = process.env.TMDB_API

async function fetchMovies(id) {
    const res = await fetch(
        `${api}/discover/movie?with_genres=${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )

    return await res.json()
}

export default async function Home({ params }) {
    const byGenres = await fetchMovies(params.id)

    return (
        <>
            <h3 className="font-bold border-b mb-4 pb-2">{ params.name }</h3>

            <Movies movies={byGenres.results} />
        </>
    )
}