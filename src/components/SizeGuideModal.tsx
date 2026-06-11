import React, { useState } from 'react';
import { X, Ruler } from 'lucide-react';

export default function SizeGuideModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 text-sm uppercase tracking-widest font-bold underline hover:text-muted-foreground transition-colors"
      >
        <Ruler className="w-4 h-4" />
        Guía de Tallas
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-background w-full max-w-2xl border border-border p-8 relative">
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 hover:bg-muted rounded-full"
            >
              <X className="w-6 h-6" />
            </button>
            
            <h2 className="text-3xl font-black uppercase mb-8 text-center">Guía de Tallas</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-foreground uppercase tracking-widest text-xs">
                    <th className="py-4 font-black">EU</th>
                    <th className="py-4 font-black">US (Men)</th>
                    <th className="py-4 font-black">US (Women)</th>
                    <th className="py-4 font-black">CM</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-b border-border hover:bg-muted/50">
                    <td className="py-4 font-bold">38</td>
                    <td className="py-4">6</td>
                    <td className="py-4">7.5</td>
                    <td className="py-4">24</td>
                  </tr>
                  <tr className="border-b border-border hover:bg-muted/50">
                    <td className="py-4 font-bold">39</td>
                    <td className="py-4">6.5</td>
                    <td className="py-4">8</td>
                    <td className="py-4">24.5</td>
                  </tr>
                  <tr className="border-b border-border hover:bg-muted/50">
                    <td className="py-4 font-bold">40</td>
                    <td className="py-4">7</td>
                    <td className="py-4">8.5</td>
                    <td className="py-4">25</td>
                  </tr>
                  <tr className="border-b border-border hover:bg-muted/50">
                    <td className="py-4 font-bold">41</td>
                    <td className="py-4">8</td>
                    <td className="py-4">9.5</td>
                    <td className="py-4">26</td>
                  </tr>
                  <tr className="border-b border-border hover:bg-muted/50">
                    <td className="py-4 font-bold">42</td>
                    <td className="py-4">8.5</td>
                    <td className="py-4">10</td>
                    <td className="py-4">26.5</td>
                  </tr>
                  <tr className="border-b border-border hover:bg-muted/50">
                    <td className="py-4 font-bold">43</td>
                    <td className="py-4">9.5</td>
                    <td className="py-4">11</td>
                    <td className="py-4">27.5</td>
                  </tr>
                  <tr className="border-b border-border hover:bg-muted/50">
                    <td className="py-4 font-bold">44</td>
                    <td className="py-4">10</td>
                    <td className="py-4">11.5</td>
                    <td className="py-4">28</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="mt-8 bg-muted p-4 text-xs text-muted-foreground uppercase tracking-widest text-center border border-border">
              <p>Recomendamos medir tu pie al final del día. Si estás entre dos tallas, elige la más grande.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
