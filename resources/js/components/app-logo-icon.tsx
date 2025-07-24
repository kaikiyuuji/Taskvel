import React from 'react';

export default function AppLogoIcon() {
    return (
        <>
            <div className="flex aspect-square size-12 items-center justify-center rounded-md">
                <img 
                    src="/taskvel_icon.svg" 
                    alt="Taskvel Logo" 
                    className="h-12 w-12"
                />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold">Taskvel</span>
            </div>
        </>
    );
}
