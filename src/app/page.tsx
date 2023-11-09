import InfoCard from "../components/InfoCard";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export default function Home() {
    return (
        <main className="relative flex min-h-screen flex-col items-center justify-between p-24 bg-gray-50">
          <div className="absolute top-6 right-24">
            <Stack spacing={2} direction="row">
                <Button variant="outlined" color="success">
                    Login
                </Button>
                <Button variant="contained" color="success" className="bg-green-700">Register</Button>
            </Stack>
            </div>
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
    );
}
