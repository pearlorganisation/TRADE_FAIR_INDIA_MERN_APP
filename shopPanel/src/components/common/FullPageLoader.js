import React from 'react'

const FullPageLoader = () => {
  return (
    <div className='absolute h-full w-full bg-white/70 backdrop-blur-md grid place-items-center'>
        <div class="spinner"></div>
        <style jsx>{
            
            `
            .spinner {
                width: 56px;
                height: 56px;
                display: grid;
                border-radius: 50%;
                -webkit-mask: radial-gradient(farthest-side,#0000 40%,#474bff 41%);
                background: linear-gradient(0deg ,rgba(71,75,255,0.5) 50%,rgba(71,75,255,1) 0) center/4.5px 100%,
                     linear-gradient(90deg,rgba(71,75,255,0.25) 50%,rgba(71,75,255,0.75) 0) center/100% 4.5px;
                background-repeat: no-repeat;
                animation: spinner-d3o0rx 0.8s infinite steps(12);
             }
             
             .spinner::before,
             .spinner::after {
                content: "";
                grid-area: 1/1;
                border-radius: 50%;
                background: inherit;
                opacity: 0.915;
                transform: rotate(30deg);
             }
             
             .spinner::after {
                opacity: 0.83;
                transform: rotate(60deg);
             }
             
             @keyframes spinner-d3o0rx {
                100% {
                   transform: rotate(1turn);
                }
             }
            `
        }</style>
    </div>
  )
}

export default FullPageLoader