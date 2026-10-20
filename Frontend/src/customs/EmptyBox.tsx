
const EmptyBox = ({title, icon}: {title: string, icon: React.ReactNode}) => {
  return (
    <div className="glass-card flex flex-col items-center justify-center  gap-4 rounded-2xl p-10 text-center text-muted-foreground lg:col-span-2">
          {icon}
        <p>{title}</p>
      </div>
  )
}

export default EmptyBox