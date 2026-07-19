interface titleProps{
     title: string
}

export const Title = ({title}: titleProps) => {
     return ( 
          <div className="w-full text-center">
               <strong className="text-xl uppercase text-brand-secondary">{title}</strong>
          </div>
     );
}

export const SubTitle = ({title}: titleProps) => {
     return ( 
          <div className="w-full">
               <strong className="text-lg uppercase text-brand-secondary">{title}</strong>
          </div>
     );
}