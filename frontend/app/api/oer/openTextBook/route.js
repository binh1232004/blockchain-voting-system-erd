import { 
    fetchToGetImgUrlOpenTextBook,
    encodeSlug
 } from "@/app/utils";
export async function GET() {
    const OER_API = 'https://open.umn.edu/opentextbooks/textbooks?format=json&license=Attribution&q=Programming';
    const res = await fetch(OER_API, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const oer = await res.json();
    const data = oer.data;

    for (let index = 0; index < data.length; index++) {
        const element = data[index];
        const imgUrl = await fetchToGetImgUrlOpenTextBook(element.url);
        element['img_url'] = imgUrl;
        // store proprty slug in api to compare params.slug in dynamics routing 
        const slug = encodeSlug(element.title);
        element['slug'] = slug;
    }

    return Response.json({ data });
}