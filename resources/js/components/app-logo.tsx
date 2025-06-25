import React from 'react';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-9 items-center justify-center rounded-md">
                <img 
                    src="/taskvel_icon.svg" 
                    alt="Taskvel Logo" 
                    className="h-6 w-6"
                />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold">Taskvel</span>
            </div>
        </>
    );
}
