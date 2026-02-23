import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@radix-ui/react-select";

export default function ProfileSkeleton() {

  return (
    <aside className="hidden lg:block w-[320px]">
      <div className="sticky top-20 ">
        <div className="space-y-4 w-full max-w-[350px]">
          {/* Основная карточка профиля */}
          <div className="rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.12)] bg-card p-5 space-y-6">
            {/* Хедер: Аватар + Имя */}
            <div className="flex items-center gap-4 mb-4">
              <Skeleton className="h-16 w-16 rounded-full shrink-0"/>
              <div className="space-y-2">
                <Skeleton className="h-5 w-32 mb-2"/> {/* Имя */}
                <Skeleton className="h-4 w-24"/> {/* Кнопка изменения */}
              </div>
            </div>

            <Separator className="bg-border/50"/>

            {/* Контактная информация и Баланс */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <Skeleton className="h-5 w-5"/> {/* Иконка почты */}
                <Skeleton className="h-4 w-40"/>
              </div>
              <div className="flex items-center gap-3 mb-2">
                <Skeleton className="h-5 w-5"/> {/* Иконка телефона */}
                <Skeleton className="h-4 w-28"/>
              </div>
              <div className="flex items-center gap-3 mb-2">
                <Skeleton className="h-5 w-5"/> {/* Иконка кошелька */}
                <Skeleton className="h-4 w-24"/>
              </div>
            </div>

            <Separator className="bg-border/50"/>

            {/* Действия */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <Skeleton className="h-5 w-5"/>
                <Skeleton className="h-4 w-36"/>
              </div>
              <div className="flex items-center gap-3 mb-2">
                <Skeleton className="h-5 w-5"/>
                <Skeleton className="h-4 w-44"/>
              </div>
              <div className="flex items-center gap-3 mb-2">
                <Skeleton className="h-5 w-5"/>
                <Skeleton className="h-4 w-32"/>
              </div>
            </div>
          </div>

          {/* Нижняя карточка навигации */}
          <div className="rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.12)] bg-card p-5 space-y-5 mt-4">
            <div className="flex items-center gap-3  mb-2">
              <Skeleton className="h-5 w-5"/>
              <Skeleton className="h-4 w-36"/>
            </div>
            <div className="flex items-center gap-3">
              <Skeleton className="h-5 w-5"/>
              <Skeleton className="h-4 w-24"/>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}