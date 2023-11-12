'use client'

import * as React from 'react';
import { useState } from 'react';
import InfoCard from "../components/InfoCard";
import {Button, Stack, Modal, Typography, TextField, Box} from '@mui/material'
import MakeNewPost from '../components/MakeNewPost'

export default function Home() {
    const [isCreateNewPostOpen, setIsCreateNewPostOpen] = useState(false);

    const handleCreateNewPost = () => {
      setIsCreateNewPostOpen(true);
    };
  
    const handleClose = () => {
      setIsCreateNewPostOpen(false);
    };
  
    return (
      <div>
        <main className="relative flex min-h-screen flex-col items-center justify-between p-24 bg-gray-50">
          <div className="absolute top-6 left-24">
            <Stack spacing={2} direction="row">
                <Button variant="outlined" color="success">
                    Login
                </Button>
                <Button variant="contained" color="success" className="bg-green-700">Register</Button>
            </Stack>
            </div>

            {/* <div className = "bottom-6 right-24 position fixed ">
                <Button variant="contained" className="bg-blue-700" onClick={handleCreateNewPost}>Create New Post</Button>
                {isCreateNewPostOpen && <MakeNewPost open={isCreateNewPostOpen} onClose={() => setIsCreateNewPostOpen(false)} />}
            </div> */}

            <div className="bottom-6 right-24 position fixed">
            <Button variant="contained" className="bg-blue-700" onClick={handleCreateNewPost}>
                Create New Post
            </Button>
            {isCreateNewPostOpen && <MakeNewPost open={isCreateNewPostOpen} onClose={handleClose} />}
            </div>

            <div className="grid grid-cols-3 gap-x-4 gap-y-8">
            {/* InfoCards */}
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
       
        <MakeNewPost
            open = {false}
            onClose={handleClose}
        />  
      </div>
    );
}
