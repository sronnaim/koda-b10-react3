import Search from "./components/Search.jsx";
import List from "./components/List.jsx";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

async function getCount() {
  const res = await fetch("https://rickandmortyapi.com/api/character")
  const data = await res.json()

  return data.info.count
}

function getRandom(min, max) {
  const floatRandom = Math.random()

  const difference = max - min

  // random between 0 and the difference
  const random = Math.round(difference * floatRandom)

  const randomWithinRange = random + min

  return randomWithinRange
}

async function getEpisodeByUrl(url) {
  const res = await fetch(url)
  const ep = await res.json()

  return ep
}

async function getChars(ids) {
  const res = await fetch(`https://rickandmortyapi.com/api/character/${ids.join(",")}`)
  const chars = await res.json()
  return (await formatChars(chars))
}

async function formatChars(chars) {
  const promises = chars.map(async (ch) => {
    const ep = await getEpisodeByUrl(ch.episode[0])

    return {
      id: ch.id,
      name: ch.name,
      status: ch.status,
      species: ch.species,
      location: ch.location.name,
      img: ch.image,
      episode: ep.name
    }
  })

  const formatted = await Promise.all(promises)

  return formatted
}

async function findByName(query) {
  const res = await fetch(`https://rickandmortyapi.com/api/character/?name=${query.toLowerCase().trim()}`)
  const data = await res.json()

  return (await formatChars(data.results))
}

function App() {
  const [chars, setChars] = useState([])
  const [searchParams] = useSearchParams()

  useEffect(() => {
    async function getRandomChars(count) {
      const charsCount = await getCount()

      const ids = []

      for (let index = 0; index < count; index++) {
        ids.push(getRandom(1, charsCount))
      }

      const chs = await getChars(ids)

      setChars(chs)
    }

    async function processQuery(q) {
      const chars = await findByName(q)

      setChars(chars)
    }

    const q = searchParams.get('q')

    if (!q)
      getRandomChars(12).catch((e) => console.error(e))
    else
      processQuery(q)

  }, [searchParams])

  return (
    <main className="min-w-screen flex items-center flex-col gap-4 px-12 py-6">
      <h1 className="text-4xl font-bold">Rick <span className="text-emerald-400">and</span> Morty Characters</h1>
      <Search />
      <List chars={chars} />
    </main>
  )
}

export default App
