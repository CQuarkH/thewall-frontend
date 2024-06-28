import Button from '@components/atoms/Button';
import { zodResolver } from '@hookform/resolvers/zod';
import { PostSchema, type CreatePost } from '@models/formSchemas';
import type { Post } from '@models/types';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { usePhotoFiles } from 'src/hooks/usePhotoFiles';
import { useDropzone } from 'react-dropzone-esm';
import { useCallback } from 'react';
import DragNDrop from '@components/molecules/DragNDrop';

interface Props {
    post?: Post;
    submitCallback: (data: CreatePost) => Promise<void>;
}

function PostForm({ post, submitCallback }: Props) {

    const onDrop = useCallback((acceptedFiles: any) => {
        handlePhotoChange(acceptedFiles);
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    const {
        photoUrls,
        setPhotoUrls,
        handlePhotoChange,
        uploadPhotosHandler,
    } = usePhotoFiles(post ? post.photoUrls : []);

    const {
        handleSubmit,
        formState: { errors, isSubmitting },
        register,
        setError,
        reset
    } = useForm<CreatePost>({
        defaultValues: post,
        resolver: zodResolver(PostSchema)
    });

    const handleFormAction: SubmitHandler<CreatePost> = async (data) => {
        try {
            const urls = await uploadPhotosHandler();
            data.photoUrls = urls;

            if (submitCallback) {
                await submitCallback(data);
                reset();
            }
        } catch (error: any) {
            console.error(error);
            setError("root", {
                message: error.message
            });
        }
    }

    return (
        <form className='flex flex-col w-[40vw] gap-3' onSubmit={handleSubmit(handleFormAction)}>
            <div className='flex flex-col gap-2'>
                <textarea
                    rows={6}
                    {...register('content')}
                    name='content'
                    id="content"
                    className="resize-none bg-transparent outline-none"
                    placeholder="What's on your mind?"
                />
            </div>
            {
                (photoUrls.length > 0) && (
                    <div className='flex w-full items-center gap-3'>
                        {
                            photoUrls.map((url, index) => (
                                <picture key={index} className='w-40 h-20 relative'>
                                    <svg
                                        onClick={() => {
                                            setPhotoUrls(prev => prev.filter((_, i) => i !== index));
                                        }}
                                        className="w-6 h-6 text-white absolute top-1 left-1 cursor-pointer"
                                        aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                        width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                        <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z" clipRule="evenodd" />
                                    </svg>
                                    <img src={url} alt="image" className='w-full h-full object-cover rounded-lg' />
                                </picture>
                            ))
                        }
                    </div>
                )
            }
            <div className='border-t h-1 border-white/20'></div>
            <div className='flex flex-col gap-5 justify-between items-center'>
                <DragNDrop handlePhotosChange={handlePhotoChange} />

                {
                    errors.root && (
                        <p className='text-red-500 text-sm'>{errors.root.message}</p>
                    )
                }
                <div className='flex w-full justify-end'>
                    <Button
                        className='w-28'
                        type='submit'
                        isLoading={isSubmitting} disabled={Object.entries(errors).length > 0}>
                        Post
                    </Button>
                </div>
            </div>

        </form>
    );
}

export default PostForm