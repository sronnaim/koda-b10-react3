function getStatusChipVars(status) {

  switch (status.toLowerCase()) {
    case 'alive':
      return "bg-emerald-50 text-emerald-600 shadow-emerald-600"

    case 'dead':
      return "bg-rose-50 text-rose-600 shadow-rose-600"

    default:
      return "bg-amber-50 text-amber-600 shadow-amber-600"
  }
}

export default function List({ chars }) {
  return (
    <>
      <ul className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full">
        {chars.map(ch => <li key={`ch-id-${ch.id}`} className="m-auto rounded-sm h-full flex flex-col gap-2 border-2 p-4 shadow-[6px_6px_0_0_black]">
          <div className="aspect-square rounded-sm overflow-hidden">
            <img src={ch.img} alt="Character Image" className="object-cover max-w-full" onError={e => {
              e.currentTarget.set("src", "/placehold.png")
            }} />
          </div>
          <h2 className="font-bold text-2xl">{ch.name}</h2>
          <p className={`border-2 p-1 rounded-sm shadow-[2px_2px_0_0_black] w-fit ${getStatusChipVars(ch.status)}`}>{`${ch.status} - ${ch.species}`}</p>
          <h3 className="font-semibold">Last known location</h3>
          <p>{ch.location}</p>
          <h3 className="font-semibold">First seen in</h3>
          <p>{ch.episode}</p>
        </li>)}
      </ul>
    </>
  )
}