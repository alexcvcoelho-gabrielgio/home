GS=git submodule add
GP=git pull
submodules: sub-doc sub-session-query sub-session-command sub-session-worker sub-track-query sub-track-command sub-track-worker sub-sim-worker

sub-pull:
	$(GP) --recurse-submodules

sub-doc:
	$(GS) https://github.com/alexcvcoelho-gabrielgio/doc.git

sub-session-query:
	$(GS) https://github.com/alexcvcoelho-gabrielgio/session-query.git

sub-session-command:
	$(GS) https://github.com/alexcvcoelho-gabrielgio/session-command.git

sub-session-worker:
	$(GS) https://github.com/alexcvcoelho-gabrielgio/session-worker.git

sub-track-query:
	$(GS) https://github.com/alexcvcoelho-gabrielgio/track-query.git

sub-track-command:
	$(GS) https://github.com/alexcvcoelho-gabrielgio/track-command.git

sub-track-worker:
	$(GS) https://github.com/alexcvcoelho-gabrielgio/track-worker.git

sub-sim-worker:
	$(GS) https://github.com/alexcvcoelho-gabrielgio/sim-worker.git
