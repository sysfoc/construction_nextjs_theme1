import Image from "next/image"

type StepRowProps = {
  index: number
  title: string
  description: string
  imageSrc: string
}

export function StepRow({ index, title, description, imageSrc }: StepRowProps) {
  const isEven = index % 2 === 1
  const displayNum = String(index + 1).padStart(2, "0")

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 items-center gap-4 md:gap-6 border-t border-[var(--border-color,_var(--border))] py-4"
      aria-label={`Step ${index + 1}`}
    >
      {!isEven ? (
        <>
          {/* Step Number - Half Width */}
          <div className="flex items-center justify-center">
            <span className="text-[var(--primary)] text-6xl md:text-7xl lg:text-8xl font-bold leading-none">
              {displayNum}
            </span>
          </div>

          {/* Content Box - Half Width */}
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4">
            {/* Image */}
            <div className="w-full md:w-1/2 flex-shrink-0">
              <div className="relative w-full aspect-[4/3] border border-[var(--border-color,_var(--border))] rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-900">
                <Image src={imageSrc || "/placeholder.svg"} alt="" fill className="object-contain" />
              </div>
            </div>

            {/* Text Content */}
            <div className="flex-1">
              <h3 className="text-[var(--page-heading,_var(--foreground))] text-base md:text-lg font-semibold leading-tight mb-1.5">
                {title}
              </h3>
              <p className="text-[var(--paragraph-color,_var(--foreground))] text-xs md:text-sm leading-snug">
                {description}
              </p>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Content Box - Half Width */}
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4 order-2 md:order-none">
            {/* Image */}
            <div className="w-full md:w-1/2 flex-shrink-0">
              <div className="relative w-full aspect-[4/3] border border-[var(--border-color,_var(--border))] rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-900">
                <Image src={imageSrc || "/placeholder.svg"} alt="" fill className="object-contain" />
              </div>
            </div>

            {/* Text Content */}
            <div className="flex-1">
              <h3 className="text-[var(--page-heading,_var(--foreground))] text-base md:text-lg font-semibold leading-tight mb-1.5">
                {title}
              </h3>
              <p className="text-[var(--paragraph-color,_var(--foreground))] text-xs md:text-sm leading-snug">
                {description}
              </p>
            </div>
          </div>

          {/* Step Number - Half Width */}
          <div className="flex items-center justify-center order-1 md:order-none">
            <span className="text-[var(--primary)] text-6xl md:text-7xl lg:text-8xl font-bold leading-none">
              {displayNum}
            </span>
          </div>
        </>
      )}
    </div>
  )
}
