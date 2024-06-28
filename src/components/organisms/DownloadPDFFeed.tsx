import { format } from '@formkit/tempo';
import type { Post } from '@models/types';
import { Page, Document, Text, Image, StyleSheet, Font, PDFDownloadLink } from '@react-pdf/renderer';
import React from 'react';

interface Props {
    posts: Post[]
}

function DownloadPDFFeed({ posts }: Props) {
    const actualDate = format(new Date(), 'medium', 'es');

    const styles = StyleSheet.create({
        body: {
            paddingTop: 35,
            paddingBottom: 65,
            paddingHorizontal: 35,
        },
        title: {
            fontSize: 24,
            textAlign: 'center',
            fontFamily: 'Oswald'
        },
        author: {
            fontSize: 12,
            textAlign: 'center',
            marginBottom: 40,
        },
        subtitle: {
            fontSize: 18,
            margin: 12,
            fontFamily: 'Oswald'
        },
        text: {
            margin: 12,
            fontSize: 14,
            textAlign: 'justify',
            fontFamily: 'Times-Roman'
        },
        image: {
            marginVertical: 15,
            marginHorizontal: 100,
            height: 200,
            objectFit: 'cover',
        },
        header: {
            fontSize: 12,
            marginBottom: 20,
            textAlign: 'center',
            color: 'grey',
        },
        pageNumber: {
            position: 'absolute',
            fontSize: 12,
            bottom: 30,
            left: 0,
            right: 0,
            textAlign: 'center',
            color: 'grey',
        },
    });

    Font.register({
        family: 'Oswald',
        src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
    });

    const FeedPDF = () => (
        <Document>
            <Page style={styles.body}>
                <Text style={styles.title}> Feed of {actualDate}</Text>
                <Text style={styles.author}> TheWall </Text>
                {posts.map((post) => (
                    <div key={post.id}>
                        <Text style={styles.subtitle} key={post.id}>
                            {
                                `${post.user.username} - ${format(new Date(post.createdAt), 'medium', 'es')}`
                            }
                        </Text>
                        {
                            post.photoUrls.map((photoUrl) => (
                                <Image

                                    key={photoUrl}
                                    style={styles.image}
                                    src={photoUrl}
                                ></Image>
                            ))
                        }
                        <Text style={styles.text}>
                            {`Content: ${post.content}`}
                        </Text>
                    </div>
                ))}
            </Page>
        </Document >
    )

    return (
        <div className='text-sm font-light text-white/60'>
            <PDFDownloadLink document={<FeedPDF />} fileName="feed.pdf">
                {({ blob, url, loading, error }) => (loading ?
                    <div role="status">
                        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin  fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div> :
                    <div className='flex items-center gap-3 hover:text-white group '>
                        <svg className="w-6 h-6  text-white/60 group-hover:text-red-500 transition-all duration-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M9 2.221V7H4.221a2 2 0 0 1 .365-.5L8.5 2.586A2 2 0 0 1 9 2.22ZM11 2v5a2 2 0 0 1-2 2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2 2 2 0 0 0 2 2h12a2 2 0 0 0 2-2 2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2V4a2 2 0 0 0-2-2h-7Zm-6 9a1 1 0 0 0-1 1v5a1 1 0 1 0 2 0v-1h.5a2.5 2.5 0 0 0 0-5H5Zm1.5 3H6v-1h.5a.5.5 0 0 1 0 1Zm4.5-3a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h1.376A2.626 2.626 0 0 0 15 15.375v-1.75A2.626 2.626 0 0 0 12.375 11H11Zm1 5v-3h.375a.626.626 0 0 1 .625.626v1.748a.625.625 0 0 1-.626.626H12Zm5-5a1 1 0 0 0-1 1v5a1 1 0 1 0 2 0v-1h1a1 1 0 1 0 0-2h-1v-1h1a1 1 0 1 0 0-2h-2Z" clipRule="evenodd" />
                        </svg>
                        <p className='transition-all duration-200'> Download Feed as PDF</p>
                    </div>
                )}
            </PDFDownloadLink>
        </div>
    )
}

export default DownloadPDFFeed