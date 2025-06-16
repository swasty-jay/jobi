import { Briefcase, GraduationCap, Users } from "lucide-react";
import { Card, CardContent } from "../ui/card";

const Features = () => {
  return (
    <div>
      <section className="px-6 md:px-10 pb-32">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-purple-700 bg-clip-text text-transparent">
              Three Ways to Grow
            </h3>
            <p className="text-gray-600 text-lg">Choose your path to success</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/90 border-purple-200 backdrop-blur-xl hover:bg-white hover:border-purple-300 transition-all duration-500 group hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/10 shadow-lg">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-2xl font-semibold mb-4 text-gray-900">
                  Volunteer to Teach
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  Share your skills and empower others. Volunteer to teach
                  digital or vocational skills and make a lasting impact.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/90 border-blue-200 backdrop-blur-xl hover:bg-white hover:border-blue-300 transition-all duration-500 group hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10 shadow-lg">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-2xl font-semibold mb-4 text-gray-900">
                  Find Jobs
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  Browse or post local and freelance jobs for skilled youth and
                  professionals. Your next opportunity awaits.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/90 border-emerald-200 backdrop-blur-xl hover:bg-white hover:border-emerald-300 transition-all duration-500 group hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/10 shadow-lg">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-2xl font-semibold mb-4 text-gray-900">
                  Get Trained
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  Access certified online vocational training in local languages
                  — even offline. Learn at your own pace.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
