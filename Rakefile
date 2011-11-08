require 'nanoc3/tasks'

desc "Runs a nanoc compile, generates jsFiddles folder in code/fiddles and add links to exercises h3 title"
task :fiddle do
  system "nanoc compile && cd fiddles && npm install && ./bin/fiddles"
end

