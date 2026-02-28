import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import "../globals.css";

export default function Page() {
  const t = useTranslations('NotFound');

  return (
   <div>
     <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
       {/* Centered Image */}
       <div className="relative w-full max-w-[404px] aspect-square mb-8">
         <Image
           src="/assets/images/not-found.png"
           alt="404 Not Found"
           fill
           priority
           className="object-contain max-w-[400px]"
         />
       </div>

       <p className="text-lg md:text-2xl lg:text-3xl mb-8 font-bold">
         {t('description')}
       </p>

       {/* Action Button */}
       <Link href="/">
         <Button className="bg-brand text-white px-8 py-6 text-lg rounded-xl transition-all">
           {t('backHome')}
         </Button>
       </Link>
     </div>
   </div>
  );
}