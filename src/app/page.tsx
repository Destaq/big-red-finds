import InfoCard from '../components/InfoCard'


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gray-50">
      <div className="grid grid-cols-3 gap-x-4 gap-y-8">
        <InfoCard
          imageURL="https://m.media-amazon.com/images/I/41j7lA0rK5L._AC_UY1000_.jpg"
          avatarName="Simon"
          avatarNetID="nmpxx"
          description="Found this let me know if you want it!!!" 
          datetime={new Date()}
          found={true}
        />
                <InfoCard
          imageURL="https://m.media-amazon.com/images/I/41j7lA0rK5L._AC_UY1000_.jpg"
          avatarName="Nitya"
          avatarNetID="nmpxx"
          description="Found this let me know if you want it!!!" 
          datetime={new Date()}
          found={true}
        />
                <InfoCard
          imageURL="https://m.media-amazon.com/images/I/41j7lA0rK5L._AC_UY1000_.jpg"
          avatarName="Nitya"
          avatarNetID="nmpxx"
          description="Found this let me know if you want it!!!" 
          datetime={new Date()}
          found={false}
        />
                <InfoCard
          imageURL="https://m.media-amazon.com/images/I/41j7lA0rK5L._AC_UY1000_.jpg"
          avatarName="Nitya"
          avatarNetID="nmpxx"
          description="Found this let me know if you want it!!!" 
          datetime={new Date()}
          found={false}
        />
                <InfoCard
          imageURL="https://m.media-amazon.com/images/I/41j7lA0rK5L._AC_UY1000_.jpg"
          avatarName="Nitya"
          avatarNetID="nmpxx"
          description="Found this let me know if you want it!!!" 
          datetime={new Date()}
          found={true}
        />
                <InfoCard
          imageURL="https://m.media-amazon.com/images/I/41j7lA0rK5L._AC_UY1000_.jpg"
          avatarName="Nitya"
          avatarNetID="nmpxx"
          description="Found this let me know if you want it!!!" 
          datetime={new Date()}
          found={false}
        />
      </div>
    </main>
  )
}
