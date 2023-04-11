export const handleImageChange = (e, data, setData) => {
    if (e.target.files && e.target.files[0]) {
        let img = e.target.files[0];
        setData( 'images', [...data.images, img] );
    }
}
