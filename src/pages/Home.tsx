// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { ArrowRight } from "lucide-react";

// export default function Home() {
//   return (
//     <div className="min-h-screen bg-background text-foreground">
//       <header className="py-6 px-4 md:px-10 flex justify-between items-center border-b">
//         <h1 className="text-xl font-bold">Jobi</h1>
//         <nav className="space-x-4 hidden md:block">
//           <a href="#jobs" className="hover:underline">
//             Jobs
//           </a>
//           <a href="#courses" className="hover:underline">
//             Training
//           </a>
//           <a href="#volunteer" className="hover:underline">
//             Volunteer
//           </a>
//         </nav>
//         <Button className="md:ml-4">
//           Get Started{" "}
//           <span className="text-2xl">
//             <ArrowRight />
//           </span>
//         </Button>
//       </header>

//       <section className="py-20 px-6 md:px-10 text-center">
//         <h2 className="text-3xl md:text-5xl font-bold mb-4">
//           Empowering Skills. Creating Jobs.
//         </h2>
//         <p className="text-gray-900 text-lg max-w-xl mx-auto">
//           Learn a trade, find a job, or give back by teaching. Jobi connects you
//           to opportunities.
//         </p>
//         <div className="mt-6 flex justify-center gap-4 flex-wrap">
//           <Button variant="default">Explore Jobs</Button>
//           <Button variant="outline">Become a Volunteer</Button>
//         </div>
//       </section>

//       <section
//         id="features"
//         className="grid md:grid-cols-3 gap-6 px-6 md:px-10 pb-20"
//       >
//         <Card>
//           <CardContent className="p-6">
//             <h3 className="text-xl font-semibold mb-2">Volunteer to Teach</h3>
//             <p className="text-stone-800">
//               Share your skills and empower others. Volunteer to teach digital
//               or vocational skills.
//             </p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="p-6">
//             <h3 className="text-xl font-semibold mb-2">Find Jobs</h3>
//             <p className="text-stone-800">
//               Browse or post local and freelance jobs for skilled youth and
//               professionals.
//             </p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="p-6">
//             <h3 className="text-xl font-semibold mb-2">Get Trained</h3>
//             <p className="text-stone-800">
//               Access certified online vocational training in local languages —
//               even offline.
//             </p>
//           </CardContent>
//         </Card>
//       </section>

//       <footer className="text-center py-10 border-t text-sm text-black">
//         &copy; {new Date().getFullYear()} Jobi. All rights reserved.
//       </footer>
//     </div>
//   );
// }

import Features from "@/components/custom/Features";
import Navbar from "@/components/custom/Navbar";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black overflow-hidden relative">
      {/* Background Image */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
        }}
      ></div>

      <div className="relative z-10">
        <Navbar />

        {/* Hero Section */}
        <section className="py-32 px-6 md:px-10 text-center relative">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-50 border border-purple-200 mb-8 backdrop-blur-sm shadow-sm">
              <Sparkles className="w-4 h-4 mr-2 text-purple-600" />
              <span className="text-sm text-purple-700 font-medium">
                Transforming careers, one skill at a time
              </span>
            </div>

            <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-purple-700 to-pink-600 bg-clip-text text-transparent leading-tight">
              Empowering Skills.
              <br />
              <span className="text-4xl md:text-6xl">Creating Jobs.</span>
            </h2>

            <p className="text-gray-600 text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Learn a trade, find a job, or give back by teaching. Jobi connects
              you to opportunities that matter.
            </p>

            <div className="flex justify-center gap-6 flex-wrap">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-lg hover:shadow-purple-500/25 transition-all duration-300 text-lg px-8 py-6"
              >
                Explore Jobs
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-purple-300 text-purple-700 hover:bg-purple-50 hover:border-purple-400 backdrop-blur-sm transition-all duration-300 text-lg px-8 py-6 bg-white/80"
              >
                Become a Volunteer
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <Features />

        {/* Footer */}
        <footer className="text-center py-12 border-t border-gray-200 backdrop-blur-xl bg-white/80">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-gradient-to-br from-purple-600 to-pink-600 rounded-md flex items-center justify-center shadow-lg">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold bg-gradient-to-r from-gray-900 to-purple-600 bg-clip-text text-transparent">
              Jobi
            </span>
          </div>
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Jobi. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}
